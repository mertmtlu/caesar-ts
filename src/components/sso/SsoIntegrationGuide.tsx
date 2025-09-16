import React, { useState } from 'react';
import Modal from '@/components/common/Modal'; // Assuming this path is correct
import { Editor } from '@monaco-editor/react';

// --- HELPER ICONS ---
const CodeIcon: React.FC = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);
const ReactIcon: React.FC = () => (
  <svg className="w-6 h-6 text-cyan-500" fill="currentColor" viewBox="0 0 32 32">
    <path xmlns="http://www.w3.org/2000/svg" d="M18.6789 15.9759C18.6789 14.5415 17.4796 13.3785 16 13.3785C14.5206 13.3785 13.3211 14.5415 13.3211 15.9759C13.3211 17.4105 14.5206 18.5734 16 18.5734C17.4796 18.5734 18.6789 17.4105 18.6789 15.9759Z" fill="#53C1DE"/>
    <path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M24.7004 11.1537C25.2661 8.92478 25.9772 4.79148 23.4704 3.39016C20.9753 1.99495 17.7284 4.66843 16.0139 6.27318C14.3044 4.68442 10.9663 2.02237 8.46163 3.42814C5.96751 4.82803 6.73664 8.8928 7.3149 11.1357C4.98831 11.7764 1 13.1564 1 15.9759C1 18.7874 4.98416 20.2888 7.29698 20.9289C6.71658 23.1842 5.98596 27.1909 8.48327 28.5877C10.9973 29.9932 14.325 27.3945 16.0554 25.7722C17.7809 27.3864 20.9966 30.0021 23.4922 28.6014C25.9956 27.1963 25.3436 23.1184 24.7653 20.8625C27.0073 20.221 31 18.7523 31 15.9759C31 13.1835 26.9903 11.7923 24.7004 11.1537ZM24.4162 19.667C24.0365 18.5016 23.524 17.2623 22.8971 15.9821C23.4955 14.7321 23.9881 13.5088 24.3572 12.3509C26.0359 12.8228 29.7185 13.9013 29.7185 15.9759C29.7185 18.07 26.1846 19.1587 24.4162 19.667ZM22.85 27.526C20.988 28.571 18.2221 26.0696 16.9478 24.8809C17.7932 23.9844 18.638 22.9422 19.4625 21.7849C20.9129 21.6602 22.283 21.4562 23.5256 21.1777C23.9326 22.7734 24.7202 26.4763 22.85 27.526ZM9.12362 27.5111C7.26143 26.47 8.11258 22.8946 8.53957 21.2333C9.76834 21.4969 11.1286 21.6865 12.5824 21.8008C13.4123 22.9332 14.2816 23.9741 15.1576 24.8857C14.0753 25.9008 10.9945 28.557 9.12362 27.5111ZM2.28149 15.9759C2.28149 13.874 5.94207 12.8033 7.65904 12.3326C8.03451 13.5165 8.52695 14.7544 9.12123 16.0062C8.51925 17.2766 8.01977 18.5341 7.64085 19.732C6.00369 19.2776 2.28149 18.0791 2.28149 15.9759ZM9.1037 4.50354C10.9735 3.45416 13.8747 6.00983 15.1159 7.16013C14.2444 8.06754 13.3831 9.1006 12.5603 10.2265C11.1494 10.3533 9.79875 10.5569 8.55709 10.8297C8.09125 9.02071 7.23592 5.55179 9.1037 4.50354ZM20.3793 11.5771C21.3365 11.6942 22.2536 11.85 23.1147 12.0406C22.8562 12.844 22.534 13.6841 22.1545 14.5453C21.6044 13.5333 21.0139 12.5416 20.3793 11.5771ZM16.0143 8.0481C16.6054 8.66897 17.1974 9.3623 17.7798 10.1145C16.5985 10.0603 15.4153 10.0601 14.234 10.1137C14.8169 9.36848 15.414 8.67618 16.0143 8.0481ZM9.8565 14.5444C9.48329 13.6862 9.16398 12.8424 8.90322 12.0275C9.75918 11.8418 10.672 11.69 11.623 11.5748C10.9866 12.5372 10.3971 13.5285 9.8565 14.5444ZM11.6503 20.4657C10.6679 20.3594 9.74126 20.2153 8.88556 20.0347C9.15044 19.2055 9.47678 18.3435 9.85796 17.4668C10.406 18.4933 11.0045 19.4942 11.6503 20.4657ZM16.0498 23.9915C15.4424 23.356 14.8365 22.6531 14.2448 21.8971C15.4328 21.9423 16.6231 21.9424 17.811 21.891C17.2268 22.6608 16.6369 23.3647 16.0498 23.9915ZM22.1667 17.4222C22.5677 18.3084 22.9057 19.1657 23.1742 19.9809C22.3043 20.1734 21.3652 20.3284 20.3757 20.4435C21.015 19.4607 21.6149 18.4536 22.1667 17.4222ZM18.7473 20.5941C16.9301 20.72 15.1016 20.7186 13.2838 20.6044C12.2509 19.1415 11.3314 17.603 10.5377 16.0058C11.3276 14.4119 12.2404 12.8764 13.2684 11.4158C15.0875 11.2825 16.9178 11.2821 18.7369 11.4166C19.7561 12.8771 20.6675 14.4086 21.4757 15.9881C20.6771 17.5812 19.7595 19.1198 18.7473 20.5941ZM22.8303 4.4666C24.7006 5.51254 23.8681 9.22726 23.4595 10.8426C22.2149 10.5641 20.8633 10.3569 19.4483 10.2281C18.6239 9.09004 17.7698 8.05518 16.9124 7.15949C18.1695 5.98441 20.9781 3.43089 22.8303 4.4666Z" fill="#53C1DE"/>
  </svg>
);
const JavaScriptIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 288 288" preserveAspectRatio="xMinYMin meet">
      <path d="M0 0h256v256H0V0z" fill="#F7DF1E"/>
      <path d="M67.312 213.932l19.59-11.856c3.78 6.701 7.218 12.371 15.465 12.371 7.905 0 12.89-3.092 12.89-15.12v-81.798h24.057v82.138c0 24.917-14.606 36.259-35.916 36.259-19.245 0-30.416-9.967-36.087-21.996M152.381 211.354l19.588-11.341c5.157 8.421 11.859 14.607 23.715 14.607 9.969 0 16.325-4.984 16.325-11.858 0-8.248-6.53-11.17-17.528-15.98l-6.013-2.58c-17.357-7.387-28.87-16.667-28.87-36.257 0-18.044 13.747-31.792 35.228-31.792 15.294 0 26.292 5.328 34.196 19.247L210.29 147.43c-4.125-7.389-8.591-10.31-15.465-10.31-7.046 0-11.514 4.468-11.514 10.31 0 7.217 4.468 10.14 14.778 14.608l6.014 2.577c20.45 8.765 31.963 17.7 31.963 37.804 0 21.654-17.012 33.51-39.867 33.51-22.339 0-36.774-10.654-43.819-24.574"/>
    </svg>
  )
const CSharpIcon: React.FC = () => (
    <svg className="w-6 h-6 text-purple-500" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.29,19.52L12.82,21l-1.11-.64a.5.5,0,0,1-.22-.42V4.58a.5.5,0,0,1,.22-.42L12.82,3l1.47,1.52V19.52M22,12l-3.18-5.5L16.29,7.1,18.83,12l-2.54,4.9,2.53-.6,3.18-5.5M9.71,6.5.24,12l3.18,5.5,2.53-.6L3.41,12l2.54-4.9ZM16,11.36v1.28h-8V11.36h8Z"/>
    </svg>
);
const ServerIcon: React.FC = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
  </svg>
);
const ShieldIcon: React.FC = () => (
  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.917L12 22l9-1.083A12.02 12.02 0 0020.618 7.984z" />
  </svg>
);
const CheckCircleIcon: React.FC = () => (
  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// --- UI HELPER COMPONENTS ---

interface SectionCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const SectionCard: React.FC<SectionCardProps> = ({ title, icon, children }) => (
  <div className="group bg-gradient-to-r from-white/90 to-white/70 dark:from-gray-800/90 dark:to-gray-800/70 backdrop-blur-sm shadow-lg hover:shadow-xl rounded-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-all duration-300 hover:scale-[1.01]">
    <div className="px-6 py-5 border-b border-gray-200/70 dark:border-gray-700/70 flex items-center space-x-4 bg-white/50 dark:bg-gray-800/50">
      <div className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-400/10 dark:to-purple-400/10 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-300">
        {icon}
      </div>
      <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
        {title}
      </h2>
    </div>
    <div className="p-6 space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
      {children}
    </div>
  </div>
);

interface CodeBlockProps {
  language: string;
  children: string;
  height?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, children, height = "300px" }) => (
  <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700/50 my-6 shadow-2xl">
    <div className="flex justify-between items-center px-5 py-3 bg-gray-800 border-b border-gray-700">
      <span className="text-sm font-mono font-semibold text-gray-300 capitalize">{language}</span>
    </div>
    <div style={{ height }} className="relative">
      <Editor
        height={height}
        language={language}
        theme="vs-dark"
        value={children.trim()}
        options={{ readOnly: true, minimap: { enabled: false }, scrollBeyondLastLine: false, fontSize: 14, fontFamily: 'JetBrains Mono, monospace', lineHeight: 1.7 }}
      />
    </div>
  </div>
);

interface AlertProps {
  type: 'warning' | 'info';
  title: string;
  children: React.ReactNode;
}

const Alert: React.FC<AlertProps> = ({ type, title, children }) => (
    <div className={`rounded-xl p-6 border mb-6 ${
        type === 'warning' 
        ? 'bg-amber-50/70 dark:bg-amber-900/20 border-amber-200/50 dark:border-amber-800/30' 
        : 'bg-blue-50/70 dark:bg-blue-900/20 border-blue-200/50 dark:border-blue-800/30'
    }`}>
        <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
                <svg className={`w-6 h-6 ${type === 'warning' ? 'text-amber-600 dark:text-amber-400' : 'text-blue-600 dark:text-blue-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
            </div>
            <div>
                <h4 className={`font-semibold mb-2 ${type === 'warning' ? 'text-amber-800 dark:text-amber-200' : 'text-blue-800 dark:text-blue-200'}`}>{title}</h4>
                <div className={`text-sm leading-relaxed ${type === 'warning' ? 'text-amber-700 dark:text-amber-300' : 'text-blue-700 dark:text-blue-300'}`}>
                    {children}
                </div>
            </div>
        </div>
    </div>
);


interface Tab {
  label: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full">
      <div className="relative flex bg-gray-50/50 dark:bg-gray-800/50 rounded-xl p-1 mb-6 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`relative flex-1 px-4 py-3 text-sm font-semibold rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2 z-10 ${
              activeTab === index
                ? 'text-blue-600 dark:text-blue-300'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
        <div
          className="absolute top-1 bottom-1 bg-white dark:bg-gray-700 rounded-lg shadow-md transition-all duration-300 ease-in-out"
          style={{
            width: `calc(${100 / tabs.length}% - 4px)`,
            transform: `translateX(calc(${activeTab * 100}% + ${activeTab * 4}px))`,
            left: '2px',
          }}
        />
      </div>
      <div className="transition-all duration-300 ease-in-out">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};


// --- MAIN CONTENT COMPONENT ---

const SsoGuideContent: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
          Secure SSO Integration Guide
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          The professional, cookie-based method for secure authentication that eliminates credential exposure in URLs.
        </p>
      </div>

      <SectionCard title="Workflow Overview" icon={<CodeIcon />}>
        <p>This process relies on a server-side POST handler and secure, <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm font-mono">HttpOnly</code> cookies for session management.</p>
        <div className="grid gap-4 mt-4">
          {[
            { step: 1, title: "SSO Launch", description: "Your application sends credentials via a hidden form POST to the target remote app's defined  `/sso-login` endpoint." },
            { step: 2, title: "Server Validation", description: "The target server validates the credentials and on success, sets a secure, `HttpOnly` session cookie." },
            { step: 3, title: "Secure Redirect", description: "The server redirects the user to the main application page (e.g., `main.html`)." },
            { step: 4, title: "Page Protection", description: "The application pages verify the user's session by calling a server endpoint that checks the cookie." }
          ].map((item, index) => (
            <div key={item.step} className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50/50 dark:bg-gray-800/30 border border-gray-200/50 dark:border-gray-700/50">
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-blue-500 text-white font-bold text-sm">{item.step}</div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{item.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Step 1: Initiating the Secure SSO Launch (Client-Side)" icon={<ReactIcon />}>
        <Alert type="info" title="Backend Agnostic">
          The JavaScript/TypeScript code below runs in the user's browser. It works regardless of whether the target server (from Step 2) is built with Node.js, ASP.NET, Python, or any other technology.
        </Alert>
        <Tabs tabs={[
          { label: "React/TypeScript", icon: <ReactIcon />, content: (
              <div>
                <p className="mb-4 text-sm">This function takes a sensitive URL (provided by your backend), parses it, and securely submits the credentials to the target server's login endpoint.</p>
                <CodeBlock language="typescript" height="400px">
                  {`const secureSsoRedirect = (ssoUrlWithParams: string) => {
  try {
    const url = new URL(ssoUrlWithParams);
    const username = url.searchParams.get('username');
    const password = url.searchParams.get('password');
    const formActionUrl = \`\${url.origin}/sso-login\`;

    if (!username || !password) {
      console.error("SSO credentials not found in URL");
      return;
    }

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = formActionUrl;
    form.target = '_blank';

    const userInput = document.createElement('input');
    userInput.type = 'hidden';
    userInput.name = 'username';
    userInput.value = username;

    const passInput = document.createElement('input');
    passInput.type = 'hidden';
    passInput.name = 'password';
    passInput.value = password;

    form.appendChild(userInput);
    form.appendChild(passInput);

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  } catch (error) {
    console.error('SSO redirect failed:', error);
  }
};`}
                </CodeBlock>
              </div>
            )
          },
          { label: "Vanilla JavaScript", icon: <JavaScriptIcon />, content: (
              <div>
                <p className="mb-4 text-sm">For non-React projects, the logic is identical. The function is called after fetching the sensitive URL from your backend.</p>
                <CodeBlock language="javascript" height="400px">
                  {`function secureSsoRedirect(ssoUrlWithParams) {
  try {
    const url = new URL(ssoUrlWithParams);
    const username = url.searchParams.get('username');
    const password = url.searchParams.get('password');

    const formActionUrl = url.origin + '/sso-login';
    // ... same logic as React example ...
  } catch (error) {
    console.error('SSO redirect failed:', error);
  }
}`}
                </CodeBlock>
              </div>
            )
          }
        ]} />
      </SectionCard>

      <SectionCard title="Step 2: Target Server Configuration" icon={<ServerIcon />}>
        <Alert type="warning" title="Attention: This is NOT for your React project!">
            This code is for the developers of the **target application** you are logging into. This POST-handling logic must exist on their server, whether it's Node.js, ASP.NET, or another stack.
        </Alert>
        <Tabs tabs={[
            { label: "Node.js (HTTP)", icon: <JavaScriptIcon />, content: (
                <div>
                    <p className="text-sm mb-2">This example uses the built-in Node.js `http` module. It creates two endpoints: `/sso-login` and `/api/me`.</p>
                    <ol className="text-sm list-decimal list-inside space-y-1 mb-4 text-gray-500 dark:text-gray-400">
                        <li>Define the `/sso-login` endpoint to handle the `POST` request.</li>
                        <li>Parse the body to get the credentials.</li>
                        <li>Validate the user.</li>
                        <li>Create and serialize a secure `HttpOnly` cookie.</li>
                        <li>Set the cookie header and redirect the user.</li>
                        <li>Define the `/api/me` endpoint to check the cookie for subsequent requests.</li>
                    </ol>
                    <CodeBlock language="javascript" height="500px">
                    {`// In server.js on the TARGET application server
const { createServer } = require('http');
const { parse: parseQuery } = require('querystring');
const { serialize, parse: parseCookie } = require('cookie');
const { validateUser } = require('./database'); // Their user validation logic

// ... inside your createServer or Express app ...

// 1. Endpoint to handle the secure POST login from your app
if (pathname === '/sso-login' && req.method === 'POST') {
  // 2. ... (parse POST body to get username/password)
  // 3. 
  const isValid = await validateUser(username, password);

  if (isValid) {
    // 4. Create a secure session cookie
    const sessionCookie = serialize('app_session', 
      JSON.stringify({ username, loggedIn: true }), {
      httpOnly: true, secure: true, path: '/', maxAge: 60 * 60 * 8, sameSite: 'strict'
    });

    // 5. Set the cookie and redirect to their main app page
    res.setHeader('Set-Cookie', sessionCookie);
    res.writeHead(302, { Location: '/dashboard' });
    res.end();
  } else { /* Handle failure */ }
  return;
}

// 6. Endpoint for client-side apps to check if they are logged in
if (pathname === '/api/me') {
  const cookies = parseCookie(req.headers.cookie || '');
  const session = cookies.app_session ? JSON.parse(cookies.app_session) : null;

  if (session && session.loggedIn) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ username: session.username }));
  } else {
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not authenticated' }));
  }
  return;
}`}
                    </CodeBlock>
                </div>
            )},
            { label: "ASP.NET Core", icon: <CSharpIcon />, content: (
                <div>
                    <p className="text-sm mb-2">This example uses modern ASP.NET Core Minimal APIs. The logic is the same but implemented with C#.</p>
                    <ol className="text-sm list-decimal list-inside space-y-1 mb-4 text-gray-500 dark:text-gray-400">
                        <li>Define the `/sso-login` POST endpoint using `MapPost`.</li>
                        <li>Bind `username` and `password` directly from the incoming form.</li>
                        <li>Inject and call a service to validate the user.</li>
                        <li>Use `Response.Cookies.Append` to create the secure `HttpOnly` cookie.</li>
                        <li>Return a redirect result.</li>
                        <li>Define the `/api/me` GET endpoint to check for the cookie.</li>
                    </ol>
                    <CodeBlock language="csharp" height="500px">
                    {`// In Program.cs on the TARGET application server (ASP.NET Core 6+)

// 1. Define the POST endpoint for SSO login
app.MapPost("/sso-login", async (HttpContext context, [FromForm] string username, [FromForm] string password, IMyUserService userService) => {
    
    // 3. Validate credentials via an injected service
    var isValid = await userService.ValidateUserAsync(username, password);

    if (isValid)
    {
        // 4. Create secure cookie options
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Secure = true, // Set to false if not using HTTPS in development
            SameSite = SameSiteMode.Strict,
            Expires = DateTime.UtcNow.AddHours(8)
        };

        // Note: You might need to serialize the session object to a string
        context.Response.Cookies.Append("app_session", "{\\"username\\":\\"" + username + "\\",\\"loggedIn\\":true}", cookieOptions);

        // 5. Redirect to the main dashboard
        return Results.Redirect("/dashboard");
    }

    return Results.Unauthorized();
});

// 6. Define the GET endpoint for session verification
app.MapGet("/api/me", (HttpContext context) => {
    if (context.Request.Cookies.TryGetValue("app_session", out var sessionCookie))
    {
        var session = JsonSerializer.Deserialize<UserSession>(sessionCookie);
        if (session?.LoggedIn == true)
        {
            return Results.Ok(new { username = session.Username });
        }
    }

    return Results.Unauthorized();
});

public record UserSession(string Username, bool LoggedIn);`}
                    </CodeBlock>
                </div>
            )}
        ]}/>
      </SectionCard>

      <SectionCard title="Step 3: Protecting Pages After Login" icon={<ShieldIcon />}>
        <p>After the SSO redirect, client applications must verify the session by calling the `/api/me` endpoint created in the previous step.</p>
        <Tabs tabs={[
            { label: "React/TypeScript", icon: <ReactIcon />, content: (
                <CodeBlock language="typescript" height="500px">
                {`// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await fetch('http://www.domain.com/api/me');
        if (response.ok) setUser(await response.json());
        else setUser(null);
      } catch { setUser(null); } 
      finally { setIsLoading(false); }
    };
    verifyUser();
  }, []);

  return { user, isLoading };
};

// src/components/ProtectedRoute.tsx
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Loading session...</div>;

  if (!user) {
    window.location.href = 'http://www.domain.com/login.html';
    return null;
  }

  return <>{children}</>;
};`}
                </CodeBlock>
            )},
            { label: "Vanilla JavaScript", icon: <JavaScriptIcon />, content: (
                <CodeBlock language="javascript" height="400px">
                {`// Place this in the main script of a protected page
async function checkLoginStatus() {
  try {
    const response = await fetch('/api/me');
    if (!response.ok) {
      window.location.href = "login.html";
      return;
    }
    const userData = await response.json();
    console.log('Welcome, ' + userData.username);
  } catch (error) {
    window.location.href = "login.html";
  }
}
document.addEventListener('DOMContentLoaded', checkLoginStatus);`}
                </CodeBlock>
            )}
        ]}/>
      </SectionCard>
      
      <SectionCard title="Security Best Practices Checklist" icon={<ShieldIcon />}>
        <ul className="space-y-3">
            {[
                { text: "Your Backend is the Guardian", detail: "The remote app's credentials must be stored securely on your backend and NEVER exposed directly to your React code." },
                { text: "Use `HttpOnly` Cookies", detail: "The target server must set the session cookie with the `HttpOnly` flag to prevent it from being stolen by cross-site scripting (XSS) attacks." },
                { text: "Set `SameSite` and `Secure` Flags", detail: "The cookie should also have `SameSite='strict'` or `'lax'` and `Secure=true` (in production) for added protection." },
            ].map(item => (
                <li key={item.text} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 pt-1"><CheckCircleIcon /></div>
                    <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{item.text}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.detail}</p>
                    </div>
                </li>
            ))}
        </ul>
      </SectionCard>

    </div>
  );
};


// --- MAIN EXPORTED COMPONENT (Button that opens the Modal) ---

interface SsoInfoButtonProps {
  className?: string;
}

const SsoInfoButton: React.FC<SsoInfoButtonProps> = ({ className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`group inline-flex items-center justify-center w-8 h-8 text-blue-600 dark:text-blue-400 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 bg-blue-50/50 dark:bg-blue-900/20 hover:shadow-lg rounded-lg transition-all duration-200 transform hover:scale-105 ${className}`}
        title="View SSO Integration Guide"
      >
        <svg className="w-4 h-4 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title=""
        size="full"
        className="max-h-[95vh]"
      >
        <div className="h-full overflow-y-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
          <SsoGuideContent />
        </div>
      </Modal>
    </>
  );
};

export default SsoInfoButton;