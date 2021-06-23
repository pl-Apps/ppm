import requests
import os
import pathlib

working_dir = str(pathlib.Path.home() + "/.ppm")
installation_dir = working_dir + "/packages"

def installPackage(packagename):
    with open(installation_dir + "/" + packagename + ".plpkg", "rw") as packagefile:
        if(os.path.isfile()):
            packagefile.write(requests.get("https://registry-ppm.cf/packages/" + packagename + ".plpkg").text)

def removePackage(packagename):
    os.remove(installation_dir + "/" + packagename)