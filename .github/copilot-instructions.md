We are building a React + TypeScript + Vite form app with react-hook-form.

Security rules:

- Never use dangerouslySetInnerHTML or eval()
- Always escape user input (React does this by default)
- Add rel="noopener noreferrer" to external links
- Validate all form inputs with react-hook-form

Code quality rules:

- Use TypeScript strict mode
- Convert number input values with Number() before comparison
- Never leave unused imports or variables
- Run `npm run fix` after each AI-generated code block

Incremental development:

- Change only one feature at a time
- Always keep the existing working code intact
- Never delete working functions unless explicitly told
