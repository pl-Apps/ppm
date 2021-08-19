import requests
import sys

res = requests.post("http://localhost/ppm-api/upload.php", files={'target': open(sys.argv[1],'rb')})
if(res.text == "UPLOADED"):
    exit(0)
elif(res.text == "FILE_EXIST"):
    exit(1)
else:
    exit(2)