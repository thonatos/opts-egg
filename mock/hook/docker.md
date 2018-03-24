## registry events

```
{
    "events":[
        {
            "id":"4991c4c0-237a-49e5-a326-849c821878ba",
            "timestamp":"2017-10-16T03:51:39.208086618Z",
            "action":"pull",
            "target":{
                "mediaType":"application/vnd.docker.distribution.manifest.v2+json",
                "size":1778,
                "digest":"sha256:159878b00f8da520f15e07bae2036d28f0305ce4c5281a02cac465fcc57bd0bb",
                "length":1778,
                "repository":"arashivision/fe.mall",
                "url":"http://registry:5000/v2/arashivision/fe.mall/manifests/sha256:159878b00f8da520f15e07bae2036d28f0305ce4c5281a02cac465fcc57bd0bb",
                "tag":"1.1.15.en_US"
            },
            "request":{
                "id":"83528f23-6bdb-4d56-8ece-935f7c1425f5",
                "addr":"192.168.16.6:54056",
                "host":"registry:5000",
                "method":"HEAD",
                "useragent":"Go-http-client/1.1"
            },
            "actor":{
                "name":"harbor-ui"
            },
            "source":{
                "addr":"607618edcbd8:5000",
                "instanceID":"d7d0ee8f-8004-43ad-8d59-a4592131c72d"
            }
        }
    ]
}
```

## aliyun-registry events
```
{
    "push_data": {
        "digest": "sha256:457f4aa83fc9a6663ab9d1b0a6e2dce25a12a943ed5bf2c1747c58d48bbb4917", 
        "pushed_at": "2016-11-29 12:25:46", 
        "tag": "latest"
    }, 
    "repository": {
        "date_created": "2016-10-28 21:31:42", 
        "name": "repoTest", 
        "namespace": "namespace", 
        "region": "cn-hangzhou", 
        "repo_authentication_type": "NO_CERTIFIED", 
        "repo_full_name": "namespace/repoTest", 
        "repo_origin_type": "NO_CERTIFIED", 
        "repo_type": "PUBLIC"
    }
}
```

## docker-hub events
```
{
  "callback_url": "https://registry.hub.docker.com/u/svendowideit/testhook/hook/2141b5bi5i5b02bec211i4eeih0242eg11000a/",
  "push_data": {
    "images": [
        "27d47432a69bca5f2700e4dff7de0388ed65f9d3fb1ec645e2bc24c223dc1cc3",
        "51a9c7c1f8bb2fa19bcd09789a34e63f35abb80044bc10196e304f6634cc582c",
        "..."
    ],
    "pushed_at": 1.417566161e+09,
    "pusher": "trustedbuilder",
    "tag": "latest"
  },
  "repository": {
    "comment_count": "0",
    "date_created": 1.417494799e+09,
    "description": "",
    "dockerfile": "#\n# BUILD\u0009\u0009docker build -t svendowideit/apt-cacher .\n# RUN\u0009\u0009docker run -d -p 3142:3142 -name apt-cacher-run apt-cacher\n#\n# and then you can run containers with:\n# \u0009\u0009docker run -t -i -rm -e http_proxy http://192.168.1.2:3142/ debian bash\n#\nFROM\u0009\u0009ubuntu\n\n\nVOLUME\u0009\u0009[\/var/cache/apt-cacher-ng\]\nRUN\u0009\u0009apt-get update ; apt-get install -yq apt-cacher-ng\n\nEXPOSE \u0009\u00093142\nCMD\u0009\u0009chmod 777 /var/cache/apt-cacher-ng ; /etc/init.d/apt-cacher-ng start ; tail -f /var/log/apt-cacher-ng/*\n",
    "full_description": "Docker Hub based automated build from a GitHub repo",
    "is_official": false,
    "is_private": true,
    "is_trusted": true,
    "name": "testhook",
    "namespace": "svendowideit",
    "owner": "svendowideit",
    "repo_name": "svendowideit/testhook",
    "repo_url": "https://registry.hub.docker.com/u/svendowideit/testhook/",
    "star_count": 0,
    "status": "Active"
  }
}
```