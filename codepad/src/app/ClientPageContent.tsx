
import Link from "next/link";
import { Folder, FileCode, X, CheckCircle2, Zap, Bug, FolderTree, Code, Globe, Shield } from "lucide-react";
export function ClientPageContent() {
  return (
    <>
      <main className="flex-grow pt-24 pb-xl px-lg lg:px-xl relative z-10 flex flex-col items-center">
        {/* Hero Section */}
        <section 
          className="w-full max-w-7xl mx-auto flex flex-col items-center text-center mt-xl mb-32 relative"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 blur-[100px] -z-10 rounded-full" />
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-on-surface mb-6 leading-tight">
            Code. <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Execute.</span> Conquer.
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto font-body">
            A lightning-fast, real-time code editor and judging platform. Built for performance, designed for developers.
          </p>
        
        <div className="flex flex-col sm:flex-row gap-md justify-center w-full sm:w-auto mt-12 z-10">
          <Link href="/auth">
            <button className="bg-primary text-on-primary font-title-md text-title-md px-xl py-md rounded-lg hover:bg-primary/90 transition-colors duration-150 active:scale-[0.97] shadow-sm">
              Start Coding Free
            </button>
          </Link>
          <button className="border-2 border-outline text-on-surface font-title-md text-title-md px-xl py-md rounded-lg hover:bg-surface-container transition-colors duration-150 active:scale-[0.97]">
            Watch Demo
          </button>
        </div>
        
        {/* Language Strip */}
        <div 
          className="flex flex-wrap gap-md mt-xl items-center justify-center text-on-surface-variant opacity-80"
        >
          {["Java", "Python", "C++", "C", "JavaScript", "TypeScript", "Rust", "Kotlin"].map((lang) => (
            <span 
              key={lang}
              className="font-label-sm text-label-sm uppercase tracking-wider bg-surface-container px-sm py-xs rounded"
            >
              {lang}
            </span>
          ))}
        </div>
      </section>

      {/* IDE Mockup Section */}
      <section 
        className="w-full max-w-6xl mx-auto mb-32 tilt-card-container"
      >
        <div className="tilt-card bg-surface-container-highest rounded-xl border border-outline-variant overflow-hidden flex flex-col h-[600px]">
          {/* Mac-like Header */}
          <div className="bg-surface/80 backdrop-blur-md h-12 flex items-center px-md border-b border-outline-variant/50 gap-sm">
            <div className="w-3 h-3 rounded-full bg-error/80"></div>
            <div className="w-3 h-3 rounded-full bg-secondary-container"></div>
            <div className="w-3 h-3 rounded-full bg-secondary"></div>
            <div className="flex-grow text-center font-label-sm text-label-sm text-on-surface-variant opacity-70">Main.java — CodePad</div>
          </div>
          
          {/* Main IDE Layout */}
          <div className="flex flex-grow overflow-hidden">
            {/* Sidebar (File Tree) */}
            <div className="w-sidebar_width flex-shrink-0 bg-surface-container border-r border-outline-variant/50 flex-col hidden md:flex">
              <div className="flex justify-center gap-md text-sm font-semibold text-on-surface-variant uppercase tracking-widest mt-lg mb-xl">
                <span className="hover:text-primary transition-colors cursor-pointer">JAVA</span>
                <span className="hover:text-primary transition-colors cursor-pointer">PYTHON</span>
                <span className="hover:text-primary transition-colors cursor-pointer">C++</span>
              </div>
              <div className="p-sm font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider pl-md">Explorer</div>
              <div className="flex flex-col font-code-body text-code-body text-on-surface">
                <div className="flex items-center gap-sm px-md py-sm hover:bg-on-surface/[0.04] cursor-pointer">
                  <Folder size={16} className="text-outline" /> src
                </div>
                <div className="flex items-center gap-sm px-md py-sm bg-primary-container/20 text-primary cursor-pointer border-l-2 border-primary">
                  <FileCode size={16} /> Main.java
                </div>
                <div className="flex items-center gap-sm px-md py-sm hover:bg-on-surface/[0.04] cursor-pointer ml-lg">
                  <FileCode size={16} className="text-outline" /> Utils.java
                </div>
                <div className="flex items-center gap-sm px-md py-sm hover:bg-on-surface/[0.04] cursor-pointer">
                  <Folder size={16} className="text-outline" /> test
                </div>
              </div>
            </div>
            
            {/* Editor Area */}
            <div className="flex-grow flex flex-col bg-surface">
              {/* Tabs */}
              <div className="flex border-b border-outline-variant/50 bg-surface-container">
                <div className="px-md py-sm font-code-table text-code-table border-b-2 border-primary bg-surface-container-highest text-on-surface flex items-center gap-sm">
                  Main.java <X size={14} className="opacity-50 hover:opacity-100 cursor-pointer" />
                </div>
                <div className="px-md py-sm font-code-table text-code-table text-on-surface-variant hover:bg-on-surface/[0.04] cursor-pointer flex items-center gap-sm">
                  Utils.java <X size={14} className="opacity-50 hover:opacity-100 cursor-pointer" />
                </div>
              </div>
              
              {/* Code Canvas */}
              <div className="flex-grow p-md font-code-body text-code-body overflow-auto relative">
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-surface-container-low text-right pr-sm py-md text-outline font-code-table text-code-table select-none border-r border-outline-variant/30 flex flex-col gap-[2px]">
                  <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span>
                </div>
                <div className="pl-lg py-xs flex flex-col gap-[2px]">
                  <div><span className="text-tertiary">public class</span> <span className="text-primary">Main</span> {"{"}</div>
                  <div className="pl-md"><span className="text-tertiary">public static void</span> <span className="text-secondary">main</span>(String[] args) {"{"}</div>
                  <div className="pl-lg"><span className="text-primary">System</span>.out.println(<span className="text-secondary">"Hello, CodePad!"</span>);</div>
                  <div className="pl-lg text-outline">// Creating a new student record</div>
                  <div className="pl-lg"><span className="border-b-2 border-error border-dashed bg-error-container/30">Studnt</span> s = <span className="text-tertiary">new</span> Student(<span className="text-secondary">"Alice"</span>);</div>
                  <div className="pl-md">{"}"}</div>
                  <div>{"}"}</div>
                </div>
              </div>
              
              {/* Terminal Panel */}
              <div className="h-48 border-t border-outline-variant/50 bg-surface-container flex flex-col">
                <div className="flex bg-surface-container-highest px-md py-[4px] border-b border-outline-variant/50">
                  <div className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant border-b border-primary pb-xs mt-xs">Terminal</div>
                </div>
                <div className="p-sm font-code-table text-code-table text-on-surface overflow-auto flex-grow flex flex-col gap-xs">
                  <div className="text-outline">Running: java Main.java</div>
                  <div className="text-secondary">Hello, CodePad!</div>
                  <div className="text-[#4caf50] mt-sm flex items-center gap-xs">
                    <CheckCircle2 size={14} /> ✓ Passed — exited with code 0 (142ms)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section 
        id="features"
        className="w-full max-w-7xl mx-auto mb-32"
      >
        <div className="text-center mb-xl">
          <h2 className="font-headline-sm text-headline-sm text-on-background mb-sm">Orchestrate Complex Projects</h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">Everything you need to write, test, and deploy in one unified environment.</p>
        </div>
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-lg"
        >
          {/* Feature 1 */}
          <div className="bg-surface-container rounded-xl p-lg border border-outline-variant/30 hover:bg-surface-container-high transition-transform hover:-translate-y-1 hover:scale-[1.02] duration-300">
            <div className="w-12 h-12 bg-primary-container text-on-primary-container rounded-lg flex items-center justify-center mb-md">
              <Zap size={24} />
            </div>
            <h3 className="font-title-md text-title-md text-on-surface mb-sm">Lightning Fast Execution</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">Run code instantly in secure, isolated containers. See terminal output in milliseconds, not seconds.</p>
          </div>
          {/* Feature 2 */}
          <div className="bg-surface-container rounded-xl p-lg border border-outline-variant/30 hover:bg-surface-container-high transition-transform hover:-translate-y-1 hover:scale-[1.02] duration-300">
            <div className="w-12 h-12 bg-primary-container text-on-primary-container rounded-lg flex items-center justify-center mb-md">
              <Bug size={24} />
            </div>
            <h3 className="font-title-md text-title-md text-on-surface mb-sm">Inline Diagnostics</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">Catch errors before you compile. Squiggly lines and hover hints guide you to the perfect syntax.</p>
          </div>
          {/* Feature 3 */}
          <div className="bg-surface-container rounded-xl p-lg border border-outline-variant/30 hover:bg-surface-container-high transition-transform hover:-translate-y-1 hover:scale-[1.02] duration-300">
            <div className="w-12 h-12 bg-primary-container text-on-primary-container rounded-lg flex items-center justify-center mb-md">
              <FolderTree size={24} />
            </div>
            <h3 className="font-title-md text-title-md text-on-surface mb-sm">Multi-File Orchestration</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">Manage complex projects with a robust file tree, tabbed editing, and seamless cross-file referencing.</p>
          </div>
          {/* Feature 4 */}
          <div className="bg-surface-container rounded-xl p-lg border border-outline-variant/30 hover:bg-surface-container-high transition-transform hover:-translate-y-1 hover:scale-[1.02] duration-300">
            <div className="w-12 h-12 bg-primary-container text-on-primary-container rounded-lg flex items-center justify-center mb-md">
              <Code size={24} />
            </div>
            <h3 className="font-title-md text-title-md text-on-surface mb-sm">Algorithmic Challenges</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">Solve curated coding problems with automated test case judging to sharpen your problem-solving skills.</p>
          </div>
          {/* Feature 5 */}
          <div className="bg-surface-container rounded-xl p-lg border border-outline-variant/30 hover:bg-surface-container-high transition-transform hover:-translate-y-1 hover:scale-[1.02] duration-300">
            <div className="w-12 h-12 bg-primary-container text-on-primary-container rounded-lg flex items-center justify-center mb-md">
              <Globe size={24} />
            </div>
            <h3 className="font-title-md text-title-md text-on-surface mb-sm">8 Languages Supported</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">Run Java, Python, C++, C, JavaScript, TypeScript, Rust, and Kotlin with first-class support.</p>
          </div>
          {/* Feature 6 */}
          <div className="bg-surface-container rounded-xl p-lg border border-outline-variant/30 hover:bg-surface-container-high transition-transform hover:-translate-y-1 hover:scale-[1.02] duration-300">
            <div className="w-12 h-12 bg-primary-container text-on-primary-container rounded-lg flex items-center justify-center mb-md">
              <Shield size={24} />
            </div>
            <h3 className="font-title-md text-title-md text-on-surface mb-sm">Secure Sandboxed Execution</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">Code runs safely in isolated Docker containers with strict resource limits and networking disabled.</p>
          </div>
        </div>
      </section>

    </main>
    </>
  );
}
