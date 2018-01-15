'use strict';

module.exports = () => {
  return async (ctx, next) => {
    const { app, socket } = ctx;
    const docker = app.io.of('/docker');
    const id = socket.id;
    const query = socket.handshake.query;
    const room = query.room;

    socket.join(room);

    // 当用户加入时
    docker.adapter.clients((err, clients) => {
      // to user
      socket.emit('online', {
        clients,
        message: `You(${id}) joined.`,
      });

      docker.adapter.clients([ room ], (err, clients) => {
        // to others
        const message = `User(${id}) joined.`;
        docker.to(room).emit('online', {
          clients,
          message,
        });
      });
    });

    await next();

    // 当用户离开时
    docker.adapter.clients([ room ], (err, clients) => {
      const message = `User(${id}) leaved.`;
      docker.to(room).emit('online', {
        clients,
        message,
      });
    });
  };
};
