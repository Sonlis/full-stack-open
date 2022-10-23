# Full stack development

Browser -> Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
Server -> Browser: index.html
Browser -> Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
Browser -> Server: HTTP GET https://studies.cs.helsinki.fi/favicon.ico
Browser -> Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js

note over browser:
browser starts executing js-code
that requests JSON data from server
end note

Browser -> Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
Server --> Browser: [{ "content":"New note","date":"2022-10-23T00:29:22.993Z" }, ...]

note over browser:
browser executes the event handler
that renders notes to display
end note
