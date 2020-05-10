To create svg sprites

`svgstore -o images/svg-sprite.svg images/*.svg`


This website takes advantage of native JS modules, which are not supported locally due to CORS restrictions.  So to test locally, you will need a server.

Run a local server.  If you have ruby, that woudl be.
`ruby -run -e httpd . -p 8000`