# opts

> WIP

DevOps Middleware based on Aliyun Container Service / Docker Service. 

**what ?**

- 镜像仓库管理
	- 共有仓库
		- aliyun docker registry
		- docker hub
	- 私有仓库 
		- Aliyun Docker Registry
		- WMware Harbor
		- Docker Registry
- 容器服务管理
	- aliyun container service
	- rancher
	- docker swarm
	- kubernetes

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org