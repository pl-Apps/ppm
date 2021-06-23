#include <SFML/Network.hpp>
#include <SFML/System.hpp>
#include <string>
#include <cstring>
#include <iostream>

using namespace std;
using namespace sf;

namespace ppm
{
    string working_dir = getenv("HOME");
    string installation_dir = working_dir +  "/.ppm/packages";
    string http404response = "RESPONSE_404_NOT_FOUND";
    
    string getPackage(string packagename) { 
        string ret;
        Http http("http://asodoasdo.com/");
        Http::Request req;
        Http::Response res;
        req.setMethod(req.Get);
        res = http.sendRequest(req);
        ret = res.getBody();
        if(res.getStatus() == res.NotFound) {
            return http404response;
        }
        else if(res.getStatus() == Http::Response::Ok)
        {
            return ret;
        }
        else
        {
            cout << res.getStatus();
            return "HMMM";
        }
    }
};