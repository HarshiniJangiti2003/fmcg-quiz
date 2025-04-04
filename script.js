document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const startScreen = document.querySelector('.start-screen');
    const quizScreen = document.querySelector('.quiz-screen');
    const resultScreen = document.querySelector('.result-screen');
    const startBtn = document.querySelector('.start-btn');
    const questionText = document.querySelector('.question-text');
    const optionsContainer = document.querySelector('.options-container');
    const progressBar = document.querySelector('.progress-bar');
    const progressText = document.querySelector('.progress-text');
    const timerBar = document.querySelector('.timer-bar');
    const pointsDisplay = document.querySelector('.points');
    const badgeDisplay = document.getElementById('badge-display');
    const badgeTitle = document.querySelector('.badge-title');
    const discountInfo = document.querySelector('.discount-info');
    const claimBtn = document.querySelector('.claim-btn');
    const restartBtn = document.querySelector('.restart-btn');

    // Quiz Data
    const quizData = [
        {
            question: "Which of these is NOT a common security feature on authentic FMCG products?",
            options: [
                "Holographic seal",
                "QR code for verification",
                "Batch number printing",
                "Plain wrapping with no markings"
            ],
            answer: 3,
            icon: "security"
        },
        {
            question: "What's the BEST way to check a product's freshness before purchase?",
            options: [
                "Check the manufacturing/expiry date",
                "Shake the package to hear contents",
                "Judge by the package color",
                "All products are equally fresh"
            ],
            answer: 0,
            icon: "freshness"
        },
        {
            question: "How can you verify you're buying a genuine brand product?",
            options: [
                "Compare prices with other stores",
                "Scan the QR code on packaging",
                "Check product weight",
                "Ask the shopkeeper"
            ],
            answer: 1,
            icon: "verification"
        },
        {
            question: "What indicates a product hasn't been tampered with?",
            options: [
                "Intact safety seal",
                "Shiny packaging",
                "Heavy weight",
                "Brand logo visibility"
            ],
            answer: 0,
            icon: "tamper"
        },
        {
            question: "Which packaging feature helps identify eco-friendly products?",
            options: [
                "Bright colors",
                "Recycling symbols",
                "Plastic windows",
                "Metallic finishes"
            ],
            answer: 1,
            icon: "eco"
        }
    ];

    // Game Variables
    let currentQuestion = 0;
    let score = 0;
    let timer;
    const questionTime = 20; // 20 seconds per question

    // Badge SVGs
    const badges = {
        ProductNovice: `<svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="75" cy="75" r="70" fill="url(#bronze)"/>
            <path d="M60 60L50 50M65 85C72.1797 85 78 79.1797 78 72C78 64.8203 72.1797 59 65 59C57.8203 59 52 64.8203 52 72C52 79.1797 57.8203 85 65 85Z" stroke="white" stroke-width="5"/>
            <path d="M0 110H150V150H0V110Z" fill="#4285F4"/>
            <text x="75" y="135" fill="white" font-family="Arial" font-weight="bold" text-anchor="middle">5% OFF</text>
                <linearGradient id="bronze" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#CD7F32"/>
                    <stop offset="100%" stop-color="#E6B17E"/>
                </linearGradient>
            </defs>
        </svg>`,
        qualityChecker: `<svg width="160" height="140" viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="80" cy="70" rx="70" ry="60" fill="url(#silver)"/>
            <path d="M60 70L75 85L100 60" stroke="#34A853" stroke-width="8" stroke-linecap="round"/>
                <linearGradient id="silver" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#C0C0C0"/>
                    <stop offset="100%" stop-color="#F8F8F8"/>
                <text x="80" y="75" fill="white" font-family="Arial" font-weight="bold" text-anchor="middle">10% OFF</text>
                </linearGradient>
            </defs>
        </svg>`,
        BrandAdvocate: `<svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M75 10L10 50V90L75 130L140 90V50L75 10Z" fill="url(#gold)"/>
            <path d="M75 40L85 60L105 65L90 80L95 100L75 90L55 100L60 80L45 65L65 60L75 40Z" fill="#FFD700"/>
            <path d="M30 120H120V140H30V120Z" fill="#EA4335"/>
            <text x="75" y="130" fill="white" font-family="Arial" font-weight="bold" text-anchor="middle">15% OFF</text>
                <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#FFD700"/>
                    <stop offset="100%" stop-color="#FFECB3"/>
                </linearGradient>
            </defs>
        </svg>`,
        authenticityPro: `<svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M75 10L10 75L75 140L140 75L75 10Z" fill="url(#diamond)"/>
            <rect x="55" y="55" width="40" height="40" fill="white"/>
            <path d="M55 55H95V95H55V55Z" fill="#0F9D58"/>
            <path d="M60 60H90V90H60V60Z" fill="white"/>
            <path d="M65 65H85V85H65V65Z" fill="#0F9D58"/>
            <path d="M20 115H130V140H20V115Z" fill="#2D2926"/>
            <text x="75" y="130" fill="#FFD700" font-family="Arial" font-weight="bold" text-anchor="middle">20% OFF</text>
                <linearGradient id="diamond" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#4285F4"/>
                    <stop offset="50%" stop-color="#34A853"/>
                    <stop offset="100%" stop-color="#EA4335"/>
                </linearGradient>
            </defs>
        </svg>`
    };

    

    // Product Icons (simplified for demo)
    const productIcons = [
        '🍶', '🧴', '🥫', '🧃', '🍪', '🧼', '🧴', '🧺'
    ];

    // Event Listeners
    startBtn.addEventListener('click', startQuiz);
    claimBtn.addEventListener('click', claimDiscount);
    restartBtn.addEventListener('click', restartQuiz);

    // Functions
    function startQuiz() {
        startScreen.classList.add('hidden');
        quizScreen.classList.remove('hidden');
        currentQuestion = 0;
        score = 0;
        showQuestion();
    }

    function showQuestion() {
        // Reset timer
        clearInterval(timer);
        startTimer();
        
        // Update progress
        const progressPercent = ((currentQuestion + 1) / quizData.length) * 100;
        progressBar.style.width = `${progressPercent}%`;
        progressText.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
        
        // Show question
        const question = quizData[currentQuestion];
        questionText.textContent = question.question;
        
        // Clear previous options
        optionsContainer.innerHTML = '';
        
        // Create options
        question.options.forEach((option, index) => {
            const optionBtn = document.createElement('button');
            optionBtn.classList.add('option-btn');
            optionBtn.textContent = option;
            optionBtn.addEventListener('click', () => selectOption(index));
            optionsContainer.appendChild(optionBtn);
        });
        
        // Create floating product icons
        createFloatingIcons();
    }

    function createFloatingIcons() {
        // Remove existing icons
        document.querySelectorAll('.product-icon').forEach(icon => icon.remove());
        
        // Add new icons
        for (let i = 0; i < 8; i++) {
            const icon = document.createElement('div');
            icon.className = 'product-icon';
            icon.textContent = productIcons[Math.floor(Math.random() * productIcons.length)];
            icon.style.left = `${Math.random() * 80 + 10}%`;
            icon.style.top = `${Math.random() * 50 + 10}%`;
            icon.style.fontSize = `${Math.random() * 20 + 20}px`;
            icon.style.animationDelay = `${Math.random() * 2}s`;
            document.querySelector('.question-container').appendChild(icon);
        }
    }

    function startTimer() {
        let timeLeft = questionTime;
        updateTimerBar(timeLeft);
        
        timer = setInterval(() => {
            timeLeft--;
            updateTimerBar(timeLeft);
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                timeUp();
            }
        }, 1000);
    }

    function updateTimerBar(timeLeft) {
        const percent = (timeLeft / questionTime) * 100;
        timerBar.style.width = `${percent}%`;
        
        if (timeLeft < 3) {
            timerBar.style.background = 'var(--danger)';
        } else if (timeLeft < 6) {
            timerBar.style.background = 'var(--warning)';
        } else {
            timerBar.style.background = 'var(--success)';
        }
    }

    function timeUp() {
        const options = document.querySelectorAll('.option-btn');
        options.forEach(option => {
            option.disabled = true;
        });
        
        // Automatically move to next question after delay
        setTimeout(() => {
            nextQuestion();
        }, 1500);
    }

    function selectOption(selectedIndex) {
        clearInterval(timer);
        
        const question = quizData[currentQuestion];
        const options = document.querySelectorAll('.option-btn');
        let isCorrect = false;
        
        // Disable all options
        options.forEach(option => {
            option.disabled = true;
        });
        
        // Check if correct
        if (selectedIndex === question.answer) {
            isCorrect = true;
            score += 5;
            options[selectedIndex].classList.add('correct');
            
            // Add correct animation
            const correctAnim = document.createElement('div');
            correctAnim.className = 'correct-anim';
            correctAnim.textContent = '✓';
            correctAnim.style.color = 'var(--success)';
            options[selectedIndex].appendChild(correctAnim);
        } else {
            options[selectedIndex].classList.add('wrong');
            options[question.answer].classList.add('correct');
            
            // Add wrong animation
            const wrongAnim = document.createElement('div');
            wrongAnim.className = 'correct-anim';
            wrongAnim.textContent = '✗';
            wrongAnim.style.color = 'var(--danger)';
            options[selectedIndex].appendChild(wrongAnim);
        }
        
        // Move to next question after delay
        setTimeout(() => {
            nextQuestion();
        }, 1500);
    }

    function nextQuestion() {
        currentQuestion++;
        
        if (currentQuestion < quizData.length) {
            showQuestion();
        } else {
            showResult();
        }
    }

    function showResult() {
        quizScreen.classList.add('hidden');
        resultScreen.classList.remove('hidden');
        
        pointsDisplay.textContent = score;
        
        // Determine badge
        let badge, title, discount;
        if (score <= 5) {
            badge = badges.ProductNovice;
            title = "Product Novice";
            discount = "5% discount";
        } else if (score <= 10) {
            badge = badges.qualityChecker;
            title = "Quality Checker";
            discount = "10% discount";
        } else if (score <= 15) {
            badge = badges.BrandAdvocate;
            title = "Brand Advocate";
            discount = "15% discount";
        } else {
            badge = badges.authenticityPro;
            title = "Authenticity Pro";
            discount = "20% discount";
        }
        
        badgeDisplay.innerHTML = badge;
        badgeTitle.textContent = title;
        discountInfo.textContent = `You've earned a ${discount} coupon!`;
        
        // Add sparkle effect to badge
        badgeDisplay.classList.add('sparkle');
    }

    function claimDiscount() {
        alert(`Your discount coupon has been sent to your email! Enjoy your ${discountInfo.textContent}`);
    }

    function restartQuiz() {
        resultScreen.classList.add('hidden');
        startScreen.classList.remove('hidden');
        badgeDisplay.classList.remove('sparkle');
    }
});
