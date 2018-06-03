//https://api.instagram.com/v1/users/self/?access_token=1656791183.73b2e99.8050cc1641f64395822f7e17c3030977
class Retriever
{
    constructor()
    {
        this.data=null;
        this.callback=null;
    }
    getData(url,callback)
    {
        this.callback=callback;
        this.asyncrequest(url,this.fetchData.bind(this));
    }
    fetchData(data)
    {
        this.data = data;
        if(this.callback)
            this.callback(data)
    }
    
    asyncrequest(url, func) {
        var xhtr = new XMLHttpRequest();
        xhtr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var data = JSON.parse(this.responseText);
                func(data);
            }
        };
        xhtr.open("GET", url, true);
        xhtr.send();
    }
}
export default Retriever;