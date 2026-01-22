<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="theme-color" content="#09090b">
    <title>InkEstimate Pro</title>
    
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;900&display=swap" rel="stylesheet">
    
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: { sans: ['Inter', 'sans-serif'] },
                    colors: { 
                        brand: '#3b82f6', 
                        dark: '#09090b', 
                        card: '#18181b',
                        input: '#27272a'
                    }
                }
            }
        }
    </script>
    <style>
        body { background-color: #000000; color: #e4e4e7; }
        ::-webkit-scrollbar { width: 0px; background: transparent; }
        .tab-active { background-color: #3b82f6; color: white; border-color: #3b82f6; }
        .tab-inactive { background-color: #18181b; color: #a1a1aa; border: 1px solid #27272a; }
        .input-dark { background-color: #000000; border: 1px solid #27272a; border-radius: 0.5rem; color: white; }
        .input-dark:focus { border-color: #3b82f6; outline: none; }
    </style>
</head>
<body class="flex flex-col h-screen overflow-hidden">

    <header class="h-16 border-b border-zinc-800 flex items-center justify-between px-6 bg-dark z-50">
        <div class="flex items-center gap-2">
            <div class="bg-yellow-500 rounded p-1"><i data-lucide="pen-tool" class="text-black w-4 h-4"></i></div>
            <span class="font-bold text-lg tracking-tight text-white">INKESTIMATE <span class="text-yellow-500">PRO</span></span>
        </div>
        
        <div class="flex items-center gap-4">
            <div class="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full">
                <i data-lucide="coins" class="text-yellow-500 w-4 h-4"></i>
                <span id="headerCredits" class="font-bold text-white text-sm">...</span>
            </div>
            <button onclick="app.logout()" class="text-zinc-500 hover:text-white"><i data-lucide="log-out" class="w-5 h-5"></i></button>
        </div>
    </header>

    <main class="flex-grow flex flex-col items-center p-4 md:p-8 overflow-y-auto">
        
        <div class="w-full max-w-3xl grid grid-cols-7 gap-2 mb-8 overflow-x-auto pb-2">
            <button class="flex flex-col items-center justify-center p-3 rounded-xl tab-active transition-all shadow-lg shadow-blue-500/20">
                <i data-lucide="calculator" class="w-5 h-5 mb-1"></i>
                <span class="text-[10px] font-bold uppercase">Preço</span>
            </button>
            <button class="flex flex-col items-center justify-center p-3 rounded-xl tab-inactive hover:bg-zinc-800 transition-all">
                <i data-lucide="type" class="w-5 h-5 mb-1"></i>
                <span class="text-[10px] font-bold uppercase">Letras</span>
            </button>
            <button class="flex flex-col items-center justify-center p-3 rounded-xl tab-inactive hover:bg-zinc-800 transition-all">
                <i data-lucide="box" class="w-5 h-5 mb-1"></i>
                <span class="text-[10px] font-bold uppercase">Artes</span>
            </button>
            <button class="flex flex-col items-center justify-center p-3 rounded-xl tab-inactive hover:bg-zinc-800 transition-all">
                <i data-lucide="instagram" class="w-5 h-5 mb-1"></i>
                <span class="text-[10px] font-bold uppercase">Insta</span>
            </button>
            <button class="flex flex-col items-center justify-center p-3 rounded-xl tab-inactive hover:bg-zinc-800 transition-all">
                <i data-lucide="video" class="w-5 h-5 mb-1"></i>
                <span class="text-[10px] font-bold uppercase">Reels</span>
            </button>
            <button class="flex flex-col items-center justify-center p-3 rounded-xl tab-inactive hover:bg-zinc-800 transition-all">
                <i data-lucide="shopping-bag" class="w-5 h-5 mb-1"></i>
                <span class="text-[10px] font-bold uppercase">Vendas</span>
            </button>
            <button class="flex flex-col items-center justify-center p-3 rounded-xl tab-inactive hover:bg-zinc-800 transition-all">
                <i data-lucide="clock" class="w-5 h-5 mb-1"></i>
                <span class="text-[10px] font-bold uppercase">Jobs</span>
            </button>
        </div>

        <div class="w-full max-w-2xl bg-[#09090b] border-t border-blue-600/50 p-6 md:p-8 relative">
            <div class="grid grid-cols-2 gap-4 mb-6">
                <input type="text" placeholder="Nome do Cliente" class="w-full input-dark p-3 text-sm">
                <input type="text" placeholder="Tel / Insta" class="w-full input-dark p-3 text-sm">
            </div>

            <div class="mb-2 text-xs font-bold text-zinc-500 uppercase tracking-widest">Dimensões</div>
            <div class="grid grid-cols-2 gap-4 mb-2">
                <div>
                    <label class="text-xs text-zinc-400 mb-1 block">Largura (cm)</label>
                    <input type="number" id="width" value="7" class="w-full input-dark p-3 font-bold text-white">
                </div>
                <div>
                    <label class="text-xs text-zinc-400 mb-1 block">Altura (cm)</label>
                    <input type="number" id="height" value="7" class="w-full input-dark p-3 font-bold text-white">
                </div>
            </div>
            <div class="text-center text-xs text-yellow-500/80 mb-6 flex items-center justify-center gap-1">
                <i data-lucide="ruler" class="w-3 h-3"></i> Área Total: <span id="areaTotal">49</span> cm²
            </div>

            <div class="mb-2 text-xs font-bold text-zinc-500 uppercase tracking-widest">Estilo & Complexidade</div>
            <div class="grid grid-cols-2 gap-3 mb-6">
                <button onclick="selectStyle(1, this)" class="style-btn bg-zinc-900 border border-zinc-700 hover:border-white text-zinc-300 py-3 rounded text-xs font-bold uppercase transition-all ring-2 ring-white">Nível 1: Traços</button>
                <button onclick="selectStyle(1.5, this)" class="style-btn bg-zinc-900 border border-zinc-700 hover:border-white text-zinc-300 py-3 rounded text-xs font-bold uppercase transition-all">Nível 3: Sombreado</button>
                <button onclick="selectStyle(2, this)" class="style-btn bg-zinc-900 border border-zinc-700 hover:border-white text-zinc-300 py-3 rounded text-xs font-bold uppercase transition-all">Nível 2: Colorido</button>
                <button onclick="selectStyle(3, this)" class="style-btn bg-zinc-900 border border-zinc-700 hover:border-white text-zinc-300 py-3 rounded text-xs font-bold uppercase transition-all">Nível 4: Cobertura</button>
            </div>

            <div class="grid grid-cols-2 gap-4 mb-8">
                <div>
                    <label class="text-xs text-zinc-400 mb-1 block">Local do Corpo</label>
                    <select class="w-full input-dark p-3 text-sm appearance-none cursor-pointer">
                        <option>Braço/Antebraço</option>
                        <option>Perna/Panturrilha</option>
                        <option>Costas/Peito (+20%)</option>
                        <option>Costela/Pescoço (+30%)</option>
                    </select>
                </div>
                <div>
                    <label class="text-xs text-zinc-400 mb-1 block text-yellow-500">Custos Extras (R$)</label>
                    <input type="number" id="extras" value="0" class="w-full input-dark p-3 text-sm border-yellow-500/30 focus:border-yellow-500">
                </div>
            </div>

            <button onclick="app.calculate()" id="btnCalculate" class="w-full py-5 bg-white hover:bg-zinc-200 text-black font-black uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                <i data-lucide="calculator" class="w-5 h-5"></i>
                Somar e Calcular Orçamento (1 Moeda)
            </button>

            <div id="resultArea" class="hidden mt-8 text-center p-6 bg-zinc-900/50 rounded-xl border border-dashed border-zinc-700">
                <p class="text-zinc-500 text-xs uppercase tracking-widest mb-1">Valor Sugerido</p>
                <div class="text-5xl font-black text-white mb-2">R$ <span id="finalPrice">0,00</span></div>
                <p class="text-zinc-600 text-[10px]">O sistema já somou automaticamente o custo de Setup + Material.</p>
            </div>

        </div>
    </main>

    <div id="lockOverlay" class="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-6">
        <div class="text-center mb-8">
            <h1 class="font-bold text-3xl text-white mb-2">InkEstimate <span class="text-yellow-500">Pro</span></h1>
            <p class="text-zinc-500 text-sm">Faça login para acessar o painel.</p>
        </div>
        <div class="w-full max-w-sm bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
            <input type="email" id="loginEmail" placeholder="Seu e-mail" class="w-full bg-black border border-zinc-800 rounded-xl py-3 px-4 text-white text-sm mb-4 focus:border-yellow-500 outline-none">
            <button onclick="app.handleLogin()" id="btnLogin" class="w-full py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-xl uppercase text-xs tracking-widest transition-all">Entrar</button>
        </div>
    </div>

    <script>
        // --- SUAS SENHAS MANTIDAS AQUI ---
        const SUPABASE_URL = "https://igmdplccgvlcfrffwgpm.supabase.co";
        const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlnbWRwbGNjZ3ZsY2ZyZmZ3Z3BtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1OTM0NDYsImV4cCI6MjA4NDE2OTQ0Nn0.Uy9NGijSIXytVYw-19szOXdet96uiY8xHQlW36K7xAg";
        
        // Inicializa o Supabase
        const { createClient } = supabase;
        const db = createClient(SUPABASE_URL, SUPABASE_KEY);

        let currentMultiplier = 1; // Padrão: Traços

        const app = {
            user: null,

            init() {
                // Desenha os ícones na tela
                lucide.createIcons();
                
                // Verifica se já estava logado antes
                const savedEmail = localStorage.getItem('ink_session_email');
                if (savedEmail) {
                    this.verifySession(savedEmail);
                }

                // Faz a conta da área em tempo real (Largura x Altura)
                ['width', 'height'].forEach(id => {
                    document.getElementById(id).addEventListener('input', () => {
                        const w = document.getElementById('width').value;
                        const h = document.getElementById('height').value;
                        document.getElementById('areaTotal').innerText = (w * h) || 0;
                    });
                });
            },

            async verifySession(email) {
                // Busca o usuário no banco
                const { data } = await db.from('clientes').select('*').eq('email', email).single();
                if (data) {
                    this.user = data;
                    this.unlockApp();
                }
            },

            async handleLogin() {
                const email = document.getElementById('loginEmail').value.trim().toLowerCase();
                const btn = document.getElementById('btnLogin');
                
                if (!email) return alert("Digite seu e-mail.");
                
                btn.innerText = "Verificando...";
                
                const { data, error } = await db.from('clientes').select('*').eq('email', email).single();

                if (data) {
                    this.user = data;
                    localStorage.setItem('ink_session_email', email);
                    this.unlockApp();
                } else {
                    alert("E-mail não encontrado. Verifique a digitação ou crie uma conta.");
                }
                btn.innerText = "Entrar";
            },

            unlockApp() {
                // Some com a tela de login
                document.getElementById('lockOverlay').classList.add('hidden');
                this.updateCreditsUI();
            },

            updateCreditsUI() {
                if(this.user) {
                    document.getElementById('headerCredits').innerText = this.user.credits;
                }
            },

            async calculate() {
                if (!this.user) return;

                const w = parseFloat(document.getElementById('width').value);
                const h = parseFloat(document.getElementById('height').value);
                const extras = parseFloat(document.getElementById('extras').value) || 0;

                if (!w || !h) return alert("Preencha Largura e Altura.");

                // Verifica se tem dinheiro (moedas)
                if (this.user.credits < 1) {
                    return alert("Saldo insuficiente. Recarregue suas moedas.");
                }

                const btn = document.getElementById('btnCalculate');
                const originalText = btn.innerHTML;
                btn.innerHTML = "Calculando...";
                btn.disabled = true;

                // Tira 1 moeda do banco de dados
                const novoSaldo = this.user.credits - 1;
                const { error } = await db.from('clientes').update({ credits: novoSaldo }).eq('id', this.user.id);

                if (!error) {
                    this.user.credits = novoSaldo;
                    this.updateCreditsUI();

                    // --- CÁLCULO MÁGICO DO PREÇO ---
                    const area = w * h;
                    const basePrice = area * 15 * currentMultiplier; // R$15 por cm² x Dificuldade
                    const final = basePrice + extras + 50; // +50 Taxa Fixa de material

                    document.getElementById('finalPrice').innerText = final.toFixed(2).replace('.', ',');
                    document.getElementById('resultArea').classList.remove('hidden');
                    
                    // Rola a tela pra baixo suavemente
                    document.getElementById('resultArea').scrollIntoView({ behavior: 'smooth' });
                } else {
                    alert("Erro de conexão. Tente novamente.");
                }

                btn.innerHTML = originalText;
                btn.disabled = false;
            },

            logout() {
                localStorage.removeItem('ink_session_email');
                location.reload();
            }
        };

        // Função para os botões de estilo (Nível 1, 2, 3...)
        window.selectStyle = function(multiplier, btn) {
            currentMultiplier = multiplier;
            document.querySelectorAll('.style-btn').forEach(b => {
                b.classList.remove('ring-2', 'ring-white', 'text-white');
                b.classList.add('text-zinc-300', 'border-zinc-700');
            });
            btn.classList.add('ring-2', 'ring-white', 'text-white');
            btn.classList.remove('border-zinc-700');
        };

        // Liga o motor do App
        app.init();
    </script>
</body>
</html>