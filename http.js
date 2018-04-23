// 同源策略：协议，端口，域名
// 基于fetch封装的请求方法，支持get，post
let domin;
if(process.env=='development'){
    domin = 'http://localhost:9000'
}
if(process.env=='production'){
    domin = 'http://www.lb717.com'
}
let $http = {
    get(url,data){
        if (Object.prototype.toString.call(data) != '[object Object]') {
            return {
                then(callback){
                    callback('get请求入参格式不正确')
                    return {
                        catch(err){
                            err(new Error('入参格式错误'))
                        }
                    }
                }
            }
        }
        let queryString = '?'
        for(let i in data){
            queryString += (i + '=' + data[i] +'&')
        }
        url = encodeURI(url+queryString.slice(0,-1));

        return fetch(url,{
            headers:{
                "Content-Type":"application/json;charset=utf-8"
            }
        }).then(res=>res.json())
    },
    post(url,data){
        if (Object.prototype.toString.call(data) != '[object Object]') {
            return {
                then(callback){
                    callback('get请求入参格式不正确')
                    return {
                        catch(err){
                            err(new Error('入参格式错误'))
                        }
                    }
                }
            };
        }
        return fetch(domin+url,{
            'body':JSON.stringify(data),    //字符串
            'headers':{
                "Content-Type":"application/json;charset=utf-8",
                "token":'123123'
            },
            'method':"POST"
        }).then(res=>res.json())
    }
}
export default $http
