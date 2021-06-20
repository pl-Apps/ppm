const https = require("https")
const http = require("http")
const exec = require("child_process").exec
const os = require("os")
const fs = require("fs")
const colors = require("colors")
const git = require("nodegit")
const input = require("console-read-write").ask
const discordrpcloader = require("./discord-rpc/load-discord-rpc")
const updater = require("./update/update")

var workingdir = os.homedir + "/.ppm"
var installdir = os.homedir + "/.ppm/packages"

var registryurl = "https://registry-ppm.cf/packages/"

async function check()
{
    if(fs.existsSync(workingdir) != true)
    {
        await fs.mkdirSync(workingdir)
    }
    if(fs.existsSync(installdir) != true)
    {
        await fs.mkdirSync(installdir)
    }
}

async function stats()
{
    console.log("ppm running on:\n" + os.platform() + " " + os.arch + "\nInstalled on: " + __dirname) 
}

async function logerror(exception = new String())
{
    console.log("[!] ".white + exception.red)
}

async function help()
{
    console.log("ppm [OPTIONS] ...\n\nppm install [package name]\nppm remove [package name]\nppm update [package name]\nppm run [package name]\nppm search [package name]\nppm local-list\nppm remote-list")
}

async function getremotepackages()
{
    await https.get(registryurl + "packages.pkgs-reg").on('response', async function (response) {
        response.on("data", async(chunk) => {
            chunk = String(chunk)
            if(chunk == "404")
            {
                logerror("Impossible to get remote package list")
                return 1
            }
            else
            {
                console.log(chunk)
            }
        })
    })
}

async function getpackages()
{
    const files = await fs.readdirSync(installdir);
    files.forEach(pkg => { 
        console.log("[*] " + "Package found at ".green + installdir + "/" + pkg.replace(".plpkg", ""))
    })
}

async function searchpackage(packagename = new String())
{
    await https.get(registryurl + packagename + ".plpkg").on('response', async function (response) {
        response.on("data", async(chunk) => {
            if(chunk != "404")
            {
                console.log("[*] " + "Package found at ".green + registryurl + packagename + ".plpkg")
            }
        })
        const files = await fs.readdirSync(installdir);
        files.forEach(pkg => { 
            if(pkg == packagename + ".plpkg") {
                console.log("[*] " + "Package found at ".green + installdir + "/" + packagename + ".plpkg")
            }
        })
    })
}

async function run(packagename = new String())
{
    if(fs.existsSync(installdir + "/" + packagename + ".plpkg"))
    {
        exec(installdir + "/" + packagename + ".plpkg", function(err, data) {
            console.log(err)
            console.log(data.toString());
        });
    }
    else
    {
        logerror("Package not found")
    }
}

async function install(packagename = new String(), install_as_global = false)
{
    if(fs.existsSync(installdir + "/" + packagename  + ".plpkg"))
    {
        logerror("Package alredy installed")
        process.exit(1)
    }
    await https.get(registryurl + packagename + ".plpkg", async (response) => {
        await(response.on("data", async(chunk) => {
            if(chunk == "404") {
                logerror("Package not found")
                process.exit(1)
            }
            else
            {
                if(install_as_global)
                {
                    if(os.platform().toLowerCase().includes("linux"))
                    {
                        const packagefile = fs.createWriteStream("/usr/bin/" + packagename)
                        await(response.pipe(packagefile))
                        exec("chmod +x /usr/bin/" + packagename)
                        console.log("[*] ".white + "Package installed as global".green)
                    }
                    else
                    {
                        logerror("Global installation is not supported for " + os.platform());
                        process.exit(1);
                    }
                }
                else
                {
                    const packagefile = fs.createWriteStream(installdir + "/" + packagename + ".plpkg")
                    await response.pipe(packagefile)
                    if(os.platform().toLowerCase().includes("linux"))
                    {
                        exec("chmod +x" + installdir + "/" + packagename + ".plpkg")
                    }
                    console.log("[*] ".white + "Package installed".green)
                }
            }
        }))
    })
}


async function upload() {}

async function remove(packagename = new String())
{
    if(fs.existsSync(installdir + "/" + packagename + ".plpkg")) {
        try {fs.unlinkSync(installdir + "/" + packagename + ".plpkg")} catch { logerror("Impossible to remove package"); process.exit(1) }
        console.log("[*] ".white + "Package removed".green)
    } else {
        logerror("The package is not installed")
        process.exit(1);
    }
}

async function update(packagename = new String())
{
    remove(packagename); install(packagename)
}

async function main()
{
    if(process.argv.length <= 2)
    {
        help()
    }
    else
    {
        if(process.argv[2] == "install")
        {
            if(process.argv.length == 3) {
                logerror("No package name")
            } else {
                if(process.argv[4] == "-g")
                {
                    install(process.argv[3], true)
                }
                else
                {
                    install(process.argv[3], false)
                }
            }
        }
        else if(process.argv[2] == "remove")
        {
            if(process.argv.length == 3) {
                logerror("No package name")
            } else {
                remove(process.argv[3])
            }
        }
        else if(process.argv[2] == "update")
        {
            if(process.argv.length == 3)
            {
                logerror("No package name")
            } else {
                update(process.argv[3])
            }
        }
        else if(process.argv[2] == "run")
        {
            if(process.argv.length == 3)
            {
                logerror("No package name")
            } else {
                run(process.argv[3])
            } 
        }
        else if(process.argv[2] == "search")
        {
            if(process.argv.length == 3)
            {
                logerror("No package name")
            } else {
                searchpackage(process.argv[3])
            }
        }
        else if(process.argv[2] == "stats")
        {
            stats()
        }
        else if(process.argv[2] == "help")
        {
            help()
        }
        else if(process.argv[2] == "local-list")
        {
            getpackages()
        }
        else if(process.argv[2] == "remote-list")
        {
            getremotepackages()
        }
        else
        {
            logerror("Invalid argument")
        }
    }
}

check()
main()