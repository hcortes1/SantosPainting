# Website Changes


### Homepage
Responsive Design 
---
- When viewed in mobile display, there should be two boxes that display per row in the homepage. Right now the boxes go one by one per row.

### Navbar 
- Look for the animations that are used and apply those same animations to the navbar styling. 
- Services drop down does not match the color or is not bolded, fix this to match the rest of the text in the navbar. 
- When the user clicks the **services** dropdown the dropdown sticks and when clicked again it does not go away. ( make sure its responsive )
### Tabs
- **Contact us** tab does not contain the same header as the rest of the other tabs, apply the header to this tab. 

### Workflow
- After writing code, deply the **codereviewer** subagent to review the newly generated code. 
- If the **code-reviewer** subagent finds an error in the code, delegate the bug fixing to the **debugger** subagent.
- For any frontend design work, deploy the **ui-designer** subagent. 

### Testing and Debugging
Follow these testing guidelines:
---
- run python -m http.server 8080 then use the **playwright** MCP to review changes made and when debugging
# Visit http://localhost:8080/SantosPainting/
