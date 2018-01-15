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