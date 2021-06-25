import requests
import os
import pathlib

working_dir = str(str(pathlib.Path.home()) + "/.ppm")
installation_dir = working_dir + "/packages"

def installPackage(packagename):
    with open(installation_dir + "/" + packagename + ".plpkg", "w") as packagefile:
        if(os.path.isfile(packagefile.name)):
            packagefile.write(requests.get("https://registry-ppm.cf/packages/" + packagename + ".plpkg").text)
        else:
            return 'ALRDYINSTALLED'

def removePackage(packagename):
    os.remove(installation_dir + "/" + packagename)

def updatePackage(packagename):
    removePackage(packagename)
    installPackage(packagename)

def localistPackage():
    i = 0
    packages = os.listdir(installation_dir)
    while(i < len(packages)):
        if(packages[i].endswith(".plpkg")):
            packages[i] = packages[i]
        else:
            packages.remove(i)
        i += 1
    return packages