# Full stack development

Browser -> Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
Server -> Browser: index.html
Browser -> Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
Browser -> Server: HTTP GET https://studies.cs.helsinki.fi/favicon.ico
Browser -> Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js

note over browser:
browser starts executing js-code
that requests JSON data from server
end note

Browser -> Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
Server --> Browser: [{ content: "Hii everyone ! ", date: "2022-10-22T21:44:58.621Z" }, ...]

note over browser:
browser executes the event handler
that renders notes to display
end note

note over browser:
Adds a not and click submit button
end note

Browser -> Server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
Browser -> Server: {note:"Oui"}
Server -> Browser: 302 Found
Browser -> Server: HTTP GET 
