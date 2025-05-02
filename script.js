// Navigation entre les sections
function showSection(sectionId) {
  // Mettre à jour les classes des sections
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.remove("active");
  });
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add("active");
  }

  // Mettre à jour les liens de navigation
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
  });
  const targetLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
  if (targetLink) {
    targetLink.classList.add("active");
  }

  // Mettre à jour la barre de progression
  updateProgress(sectionId);

  // Si on affiche la section quiz, initialiser le quiz
  if (sectionId === "quiz") {
    initQuiz();
  }

  // Scroller vers le haut
  window.scrollTo(0, 0);
};

// Gestion du menu hamburger
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  const overlay = document.getElementById('overlay');

  hamburger.addEventListener('click', function() {
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
      overlay.classList.toggle('active');
  });

  // Fermer le menu lorsqu'on clique sur l'overlay
  overlay.addEventListener('click', function() {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      this.classList.remove('active');
  });

  // Fermer le menu lorsqu'un lien est cliqué
  document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', function() {
          hamburger.classList.remove('active');
          navLinks.classList.remove('active');
          overlay.classList.remove('active');
      });
  });
});

// Mise à jour de la barre de progression
function updateProgress(sectionId) {
  const sections = [
    "intro",
    "classes-objets",
    "encapsulation",
    "heritage",
    "polymorphisme",
    "quiz",
  ];
  const currentIndex = sections.indexOf(sectionId);
  const progressPercentage = (currentIndex / (sections.length - 1)) * 100;

  document.getElementById("progress").style.width = `${progressPercentage}%`;
};

// Override nav link clicks to prevent default and call showSection properly
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      const sectionId = href.substring(1);
      showSection(sectionId);
    }
  });
});

// Demo de voiture (classes et objets)
document.addEventListener("DOMContentLoaded", function () {
  const carEl = document.getElementById("car");
  const carBodyEl = document.getElementById("car-body");
  const startBtn = document.getElementById("start-btn");
  const accelerateBtn = document.getElementById("accelerate-btn");
  const brakeBtn = document.getElementById("brake-btn");
  const carStartedEl = document.getElementById("car-started");
  const carSpeedEl = document.getElementById("car-speed");
  const carColorEl = document.getElementById("car-color");
  const colorBtns = document.querySelectorAll(".color-btn");

  let carStarted = false;
  let carSpeed = 0;

  // Simulation de la classe Voiture
  const carObject = {
    color: "Rouge",
    colorHex: "#e74c3c",
    started: false,
    speed: 0,

    start: function () {
      if (!this.started) {
        this.started = true;
        carStartedEl.textContent = "Oui";
        return true;
      }
      return false;
    },

    accelerate: function () {
      if (this.started) {
        this.speed += 10;
        carSpeedEl.textContent = this.speed;
        // Animation de la voiture
        carEl.style.transform = `translateX(${Math.min(
          this.speed * 5,
          400
        )}px)`;
        return true;
      }
      return false;
    },

    brake: function () {
      if (this.speed > 0) {
        this.speed -= 10;
        if (this.speed < 0) this.speed = 0;
        carSpeedEl.textContent = this.speed;
        // Animation de la voiture
        carEl.style.transform = `translateX(${Math.min(
          this.speed * 5,
          400
        )}px)`;
        return true;
      }
      return false;
    },

    changeColor: function (color, hex) {
      this.color = color;
      this.colorHex = hex;
      carColorEl.textContent = color;
      carBodyEl.style.backgroundColor = hex;
    },
  };

  // Événements
  startBtn.addEventListener("click", function () {
    if (carObject.start()) {
      startBtn.classList.add("btn-disabled");
    }
  });

  accelerateBtn.addEventListener("click", function () {
    if (!carObject.accelerate()) {
      alert("Vous devez d'abord démarrer la voiture!");
    }
  });

  brakeBtn.addEventListener("click", function () {
    carObject.brake();
  });

  colorBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const color = this.dataset.color;
      const hex = this.dataset.hex;
      carObject.changeColor(color, hex);

      // Mise à jour de l'interface
      colorBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
    });
  });
});

// Demo du compte bancaire (encapsulation)
const accountBalance = document.getElementById("account-balance");
const accountOwner = document.getElementById("account-owner");
const depositBtn = document.getElementById("deposit-btn");
const withdrawBtn = document.getElementById("withdraw-btn");
const amountInput = document.getElementById("transaction-amount");
const changeOwnerBtn = document.getElementById("change-owner-btn");
const newOwnerInput = document.getElementById("new-owner");
const transactionLog = document.getElementById("transaction-log");

// Simulation de la classe CompteBancaire avec encapsulation
const bankAccount = {
  // Attributs privés (simulation)
  _owner: "Jean Dupont",
  _balance: 1000,
  _accountNumber: "1234-5678-5678",

  // Getters
  getOwner: function () {
    return this._owner;
  },

  getBalance: function () {
    return this._balance;
  },

  getAccountNumber: function () {
    return (
      "XXXX-XXXX-" +
      this._accountNumber.substring(this._accountNumber.length - 4)
    );
  },

  // Setters avec validation
  setOwner: function (newOwner) {
    if (newOwner && newOwner.trim() !== "") {
      this._owner = newOwner;
      return true;
    }
    return false;
  },

  // Méthodes
  deposit: function (amount) {
    amount = parseFloat(amount);
    if (isNaN(amount) || amount <= 0) {
      logTransaction(
        "Erreur: Le montant du dépôt doit être un nombre positif."
      );
      return false;
    }

    this._balance += amount;
    logTransaction(
      `Dépôt de ${amount}€ effectué. Nouveau solde: ${this._balance}€`
    );
    return true;
  },

  withdraw: function (amount) {
    amount = parseFloat(amount);
    if (isNaN(amount) || amount <= 0) {
      logTransaction(
        "Erreur: Le montant du retrait doit être un nombre positif."
      );
      return false;
    }

    if (this._balance < amount) {
      logTransaction("Erreur: Solde insuffisant pour ce retrait.");
      return false;
    }

    this._balance -= amount;
    logTransaction(
      `Retrait de ${amount}€ effectué. Nouveau solde: ${this._balance}€`
    );
    return true;
  },
};

function logTransaction(message) {
  const logEntry = document.createElement("p");
  logEntry.innerHTML = message.replace(/\\n/g, "<br>");
  transactionLog.prepend(logEntry);

  // Mettre à jour l'affichage du solde
  accountBalance.textContent = bankAccount.getBalance();
};

// Événements du compte bancaire
depositBtn.addEventListener("click", function () {
  bankAccount.deposit(amountInput.value);
  amountInput.value = "";
});

withdrawBtn.addEventListener("click", function () {
  bankAccount.withdraw(amountInput.value);
  amountInput.value = "";
});

changeOwnerBtn.addEventListener("click", function () {
  const newOwner = newOwnerInput.value;
  if (bankAccount.setOwner(newOwner)) {
    accountOwner.textContent = bankAccount.getOwner();
    logTransaction(`Propriétaire changé pour: ${newOwner}`);
    newOwnerInput.value = "";
  } else {
    logTransaction("Erreur: Le nom du propriétaire ne peut pas être vide.");
  }
});

// Démo de l'héritage
const testCarBtn = document.getElementById("test-car-btn");
const testMotoBtn = document.getElementById("test-moto-btn");
const inheritanceOutput = document.getElementById("inheritance-demo-output");

function logInheritance(message) {
  const logEntry = document.createElement("p");
  logEntry.innerHTML = message.replace(/\\n/g, "<br>");
  inheritanceOutput.appendChild(logEntry);

  // Auto-scroll vers le bas
  inheritanceOutput.scrollTop = inheritanceOutput.scrollHeight;
}

// Simulation de l'héritage
const vehicleBase = {
  brand: "",
  color: "",
  speed: 0,

  accelerate: function () {
    this.speed += 5;
    return `Vitesse actuelle: ${this.speed} km/h`;
  },

  brake: function () {
    if (this.speed >= 5) {
      this.speed -= 5;
    } else {
      this.speed = 0;
    }
    return `Vitesse actuelle: ${this.speed} km/h`;
  },

  honk: function () {
    return "Beep beep!";
  },
};

// Sous-classe Voiture
const car = Object.create(vehicleBase);
car.brand = "Toyota";
car.color = "Rouge";
car.doors = 4;
car.hasAC = false;

car.accelerate = function () {
  this.speed += 10;
  return `La voiture accélère! Vitesse: ${this.speed} km/h`;
};

car.activateAC = function () {
  this.hasAC = true;
  return "Climatisation activée.";
};

// Sous-classe Moto
const moto = Object.create(vehicleBase);
moto.brand = "Yamaha";
moto.color = "Noir";
moto.hasSidecar = false;

moto.accelerate = function () {
  this.speed += 15;
  return `La moto accélère rapidement! Vitesse: ${this.speed} km/h`;
};

moto.honk = function () {
  return "Tut tut!";
};

// Événements pour tester l'héritage
testCarBtn.addEventListener("click", function () {
  inheritanceOutput.innerHTML = "";
  car.speed = 0;

  logInheritance(`Création d'une voiture ${car.brand} de couleur ${car.color}`);
  logInheritance(car.accelerate());
  logInheritance(car.accelerate());
  logInheritance(car.brake());
  logInheritance(car.honk());
  logInheritance(car.activateAC());
});

testMotoBtn.addEventListener("click", function () {
  inheritanceOutput.innerHTML = "";
  moto.speed = 0;

  logInheritance(`Création d'une moto ${moto.brand} de couleur ${moto.color}`);
  logInheritance(moto.accelerate());
  logInheritance(moto.accelerate());
  logInheritance(moto.brake());
  logInheritance(moto.honk());
});

const canvas = document.getElementById("canvas");
const addFormBtn = document.getElementById("add-form-btn");
const shapeTypeSelect = document.getElementById("shape-type");
const drawAllBtn = document.getElementById("draw-all-btn");
const clearShapesBtn = document.getElementById("clear-shapes-btn");
const polyOutput = document.getElementById("poly-output");

let shapes = [];

// Ajout d'une forme
addFormBtn.addEventListener("click", function () {
  const shapeType = shapeTypeSelect.value;
  const shape = createShape(shapeType);
  shapes.push(shape);
  polyOutput.textContent = `Forme ajoutée: ${shapeType}`;
});

// Dessiner toutes les formes
drawAllBtn.addEventListener("click", function () {
  canvas.innerHTML = "";
  shapes.forEach((shape) => {
    shape.draw(canvas);
  });
});

// Effacer les formes
clearShapesBtn.addEventListener("click", function () {
  shapes = [];
  canvas.innerHTML = "";
  polyOutput.textContent = "Aucune forme";
});

// Création d'une forme
function createShape(type) {
  switch (type) {
    case "cercle":
      return new Circle();
    case "rectangle":
      return new Rectangle();
    case "triangle":
      return new Triangle();
    default:
      throw new Error(`Type de forme inconnu: ${type}`);
  }
}

// Classe de base pour les formes
class Shape {
  constructor() {}

  draw(canvas) {
    throw new Error('Méthode "draw" non implémentée');
  }
}

// Classe Cercle
class Circle extends Shape {
  constructor() {
    super();
    this.radius = 50;
  }

  draw(canvas) {
    const circle = document.createElement("div");
    circle.style.width = `${this.radius * 2}px`;
    circle.style.height = `${this.radius * 2}px`;
    circle.style.borderRadius = "50%";
    circle.style.background = "blue";
    canvas.appendChild(circle);
  }
}

// Classe Rectangle
class Rectangle extends Shape {
  constructor() {
    super();
    this.width = 100;
    this.height = 50;
  }

  draw(canvas) {
    const rect = document.createElement("div");
    rect.style.width = `${this.width}px`;
    rect.style.height = `${this.height}px`;
    rect.style.background = "red";
    canvas.appendChild(rect);
  }
}

// Classe Triangle
class Triangle extends Shape {
  constructor() {
    super();
    this.base = 100;
    this.height = 50;
  }

  draw(canvas) {
    const triangle = document.createElement("div");
    triangle.style.width = "0";
    triangle.style.height = "0";
    triangle.style.borderLeft = `${this.base / 2}px solid transparent`;
    triangle.style.borderRight = `${this.base / 2}px solid transparent`;
    triangle.style.borderBottom = `${this.height}px solid green`;
    canvas.appendChild(triangle);
  }
}

function switchTab(tabId, element) {
  // Remove active class from all tabs in the same container
  const tabsContainer = element.parentElement;
  Array.from(tabsContainer.children).forEach((tab) => {
    tab.classList.remove("active");
  });
  // Add active class to clicked tab
  element.classList.add("active");

  // Hide all tab contents in the same container
  const container = tabsContainer.parentElement;
  Array.from(container.querySelectorAll(".tab-content")).forEach((content) => {
    content.classList.remove("active");
  });

  // Show the selected tab content
  const selectedContent = container.querySelector(`#${tabId}-tab`);
  if (selectedContent) {
    selectedContent.classList.add("active");
  }
}

// Quiz functionality
function initQuiz() {
  const questions = [
    {
      question: "Qu'est-ce que la Programmation Orientée Objet (POO) ?",
      options: [
        "Un paradigme basé sur les fonctions",
        "Un paradigme basé sur les objets",
        "Un langage de programmation",
        "Une base de données"
      ],
      answer: 1,
    },
    {
      question: "Quels sont les 4 piliers de la POO ?",
      options: [
        "Variables, Fonctions, Classes, Objets",
        "Encapsulation, Héritage, Polymorphisme, Abstraction",
        "Boucles, Conditions, Fonctions, Classes",
        "Encapsulation, Héritage, Polymorphisme, Interfaces"
      ],
      answer: 1,
    },
    {
      question: "Qu'est-ce que l'encapsulation ?",
      options: [
        "Cacher les détails d'implémentation et contrôler l'accès aux données",
        "Hériter des propriétés d'une autre classe",
        "Redéfinir une méthode dans une sous-classe",
        "Créer plusieurs méthodes avec le même nom"
      ],
      answer: 0,
    },
    {
      question: "Qu'est-ce que l'héritage ?",
      options: [
        "Un objet peut prendre différentes formes",
        "Une classe peut hériter des attributs et méthodes d'une autre classe",
        "La création d'objets à partir d'une classe",
        "La protection des données"
      ],
      answer: 1,
    },
    {
      question: "Qu'est-ce que le polymorphisme ?",
      options: [
        "La surcharge de méthodes",
        "La redéfinition de méthodes",
        "La capacité d'un objet à adopter différentes formes selon le contexte",
        "Toutes les réponses ci-dessus"
      ],
      answer: 3,
    },
  ];

  let currentQuestionIndex = 0;
  let score = 0;

  const questionEl = document.getElementById("question");
  const optionsEl = document.getElementById("options");
  const nextBtn = document.getElementById("next-btn");
  const feedbackEl = document.getElementById("quiz-feedback");
  const quizResultEl = document.getElementById("quiz-result");
  const scoreEl = document.getElementById("score");
  const totalEl = document.getElementById("total");

  function showQuestion() {
    feedbackEl.textContent = "";
    nextBtn.style.display = "none";
    const currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    optionsEl.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {
      const optionBtn = document.createElement("button");
      optionBtn.classList.add("btn", "btn-option");
      optionBtn.textContent = option;
      optionBtn.addEventListener("click", () => selectOption(index));
      optionsEl.appendChild(optionBtn);
    });
  }

  function selectOption(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    const optionButtons = optionsEl.querySelectorAll("button");
    optionButtons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === currentQuestion.answer) {
        btn.classList.add("btn-correct");
      }
      if (idx === selectedIndex && idx !== currentQuestion.answer) {
        btn.classList.add("btn-wrong");
      }
    });

    if (selectedIndex === currentQuestion.answer) {
      score++;
      feedbackEl.textContent = "Bonne réponse !";
      feedbackEl.style.color = "green";
    } else {
      feedbackEl.textContent = `Mauvaise réponse. La bonne réponse est : "${currentQuestion.options[currentQuestion.answer]}"`;
      feedbackEl.style.color = "red";
    }

    nextBtn.style.display = "inline-block";
  }

  nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  });

  function showResult() {
    document.getElementById("question-container").style.display = "none";
    quizResultEl.style.display = "block";
    scoreEl.textContent = score;
    totalEl.textContent = questions.length;
  }

  window.resetQuiz = function () {
    currentQuestionIndex = 0;
    score = 0;
    quizResultEl.style.display = "none";
    document.getElementById("question-container").style.display = "block";
    showQuestion();
  };

  showQuestion();
}
