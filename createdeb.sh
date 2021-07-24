rm -f ppm-debian-installer/*.deb
pkg . -t latest-x86_64 -o deb/ppm_1.0-1_amd64/usr/bin/ppm
dpkg-deb --build --root-owner-group ppm-debian-installer/ppm_1.0-1_amd64/
