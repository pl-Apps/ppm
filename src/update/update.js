module.exports =  {
    update: async function ()
    {
        if(this.islatest() != true)
        {

        }
        else
        {
            return true;
        }
    },

    islatest: async function (currentversion) 
    {
        const https = require("https")
        const fs = require("fs")
        const options = {
            hostname: 'api.github.com',
            path: '/repos/pl-Apps/ppm/releases/latest',
            headers: { 'User-Agent': 'Mozilla/5.0' }
        };
          
        https.get(options, async function(res) {
            res.on('data', async function (chunk) {
                var s = String(chunk)
                s = s.split("\"tag_name\"")
                console.log(s[0])
            })
        });
    }
}