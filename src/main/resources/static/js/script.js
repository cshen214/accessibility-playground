const contrastButton = document.getElementById("contrastButton");
const motionButton = document.getElementById("motionButton");
const currentScore =
    document.getElementById("currentScore");

const scoreSection =
    document.getElementById("scoreSection");

const scoreDisplay =
    document.getElementById("scoreDisplay");

const scoreMessage =
    document.getElementById("scoreMessage");

const restartButton =
    document.getElementById("restartButton");

// =========================
// High Contrast
// =========================

contrastButton.addEventListener("click", () => {

    document.body.classList.toggle("high-contrast");

    const enabled = document.body.classList.contains("high-contrast");

    contrastButton.textContent =
        enabled
            ? "Disable High Contrast"
            : "Enable High Contrast";
});


// =========================
// Reduced Motion
// =========================

motionButton.addEventListener("click", () => {

    document.body.classList.toggle("reduced-motion");

    const enabled = document.body.classList.contains("reduced-motion");

    motionButton.textContent =
        enabled
            ? "Enable Motion"
            : "Reduce Motion";
});

// =========================
// Font Size
// =========================

const decreaseFontButton =
    document.getElementById("decreaseFontButton");

const increaseFontButton =
    document.getElementById("increaseFontButton");

const fontSizeDisplay =
    document.getElementById("fontSizeDisplay");

let fontSize = 100;

const MIN_FONT_SIZE = 80;
const MAX_FONT_SIZE = 130;
const FONT_SIZE_STEP = 10;


function updateFontSize() {

    document.documentElement.style.fontSize =
        `${fontSize}%`;

    fontSizeDisplay.textContent =
        `${fontSize}%`;

    decreaseFontButton.disabled =
        fontSize <= MIN_FONT_SIZE;

    increaseFontButton.disabled =
        fontSize >= MAX_FONT_SIZE;
}


decreaseFontButton.addEventListener("click", () => {

    if (fontSize > MIN_FONT_SIZE) {

        fontSize -= FONT_SIZE_STEP;

        updateFontSize();
    }
});


increaseFontButton.addEventListener("click", () => {

    if (fontSize < MAX_FONT_SIZE) {

        fontSize += FONT_SIZE_STEP;

        updateFontSize();
    }
});


updateFontSize();

// =========================
// Accessibility Challenge
// =========================


const continueButton =
    document.getElementById("continueButton");

const challengeSection =
    document.getElementById("challengeSection");

const submitAnswerButton =
    document.getElementById("submitAnswerButton");

const challengeFeedback =
    document.getElementById("challengeFeedback");

const challenge2Heading =
    document.getElementById("challenge2Heading");

const challenge3Heading =
    document.getElementById("challenge3Heading");


continueButton.addEventListener("click", () => {

    challengeSection.hidden = false;

    challengeSection.scrollIntoView({
        behavior:
            document.body.classList.contains(
                "reduced-motion"
            )
                ? "auto"
                : "smooth"
    });

        continueButton.textContent = "Start Challenge";
        continueButton.disabled = false;
        challengeSection.hidden = true;
});


submitAnswerButton.addEventListener("click", async () => {

    const selectedAnswer =
        document.querySelector(
            'input[name="challenge1"]:checked'
        );


    // Make sure the user selected an answer

    if (!selectedAnswer) {

        challengeFeedback.hidden = false;

        challengeFeedback.className =
            "challenge-feedback incorrect";

        challengeFeedback.textContent =
            "Please select an answer before continuing.";

        return;
    }


    // Send the answer to Spring Boot

    try {

        const response = await fetch(
            "/api/challenges/1/answer",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    answer: selectedAnswer.value
                })
            }
        );

        if (!response.ok) {
            throw new Error(
                `Server returned ${response.status}`
            );
        }


        // Convert Spring Boot's response into JavaScript

        const result = await response.json();


        // Display the result

        challengeFeedback.hidden = false;

        if (result.correct) {
            submitAnswerButton.disabled = true;
            currentScore.textContent =
                `Score: ${result.score} / ${result.total}`;
            challengeFeedback.className =
                "challenge-feedback correct";

            challengeFeedback.textContent =
                result.feedback;


            // Move to Challenge 2

            setTimeout(() => {

                const challenge2Section =
                    document.getElementById(
                        "challenge2Section"
                    );

                challenge2Section.hidden = false;

                challenge2Heading.focus({
                    preventScroll: true
                });

                challenge2Section.scrollIntoView({
                    behavior:
                        document.body.classList.contains(
                            "reduced-motion"
                        )
                            ? "auto"
                            : "smooth"
                });

            }, 1000);

        } else {

            challengeFeedback.className =
                "challenge-feedback incorrect";

            challengeFeedback.textContent =
                result.feedback;
        }

    } catch (error) {

        console.error(
            "Error checking answer:",
            error
        );

        challengeFeedback.hidden = false;

        challengeFeedback.className =
            "challenge-feedback incorrect";

        challengeFeedback.textContent =
            "Something went wrong while checking your answer. Please try again.";
    }

});

// =========================
// Accessibility Challenge 2
// =========================
const challenge2Section =
    document.getElementById("challenge2Section");

const submitChallenge2Button =
    document.getElementById("submitChallenge2Button");

const challenge2Feedback =
    document.getElementById("challenge2Feedback");


submitChallenge2Button.addEventListener("click", async () => {

    const selectedAnswer =
        document.querySelector(
            'input[name="challenge2"]:checked'
        );


    if (!selectedAnswer) {

        challenge2Feedback.hidden = false;

        challenge2Feedback.className =
            "challenge-feedback incorrect";

        challenge2Feedback.textContent =
            "Please select an answer before continuing.";

        return;
    }


    try {

        const response = await fetch(
            "/api/challenges/2/answer",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    answer: selectedAnswer.value
                })
            }
        );

        if (!response.ok) {
            throw new Error(
                `Server returned ${response.status}`
            );
        }


        const result = await response.json();


        challenge2Feedback.hidden = false;


        if (result.correct) {
            submitAnswerButton.disabled = true;
            currentScore.textContent =
                `Score: ${result.score} / ${result.total}`;

            challenge2Feedback.className =
                "challenge-feedback correct";

            challenge2Feedback.textContent =
                result.feedback;
            setTimeout(() => {

                const challenge3Section =
                    document.getElementById(
                        "challenge3Section"
                    );
                challenge3Section.hidden = false;

                challenge3Heading.focus({
                    preventScroll: true
                });

                challenge3Section.scrollIntoView({
                    behavior:
                        document.body.classList.contains(
                            "reduced-motion"
                        )
                            ? "auto"
                            : "smooth"
                });

            }, 1000);
        } else {

            challenge2Feedback.className =
                "challenge-feedback incorrect";

            challenge2Feedback.textContent =
                result.feedback;
        }


    } catch (error) {

        console.error(
            "Error checking answer:",
            error
        );

        challenge2Feedback.hidden = false;

        challenge2Feedback.className =
            "challenge-feedback incorrect";

        challenge2Feedback.textContent =
            "Something went wrong while checking your answer. Please try again.";
    }

});

// =========================
// Accessibility Challenge 3
// =========================

const submitChallenge3Button =
    document.getElementById("submitChallenge3Button");

const challenge3Feedback =
    document.getElementById("challenge3Feedback");


submitChallenge3Button.addEventListener("click", async () => {

    const selectedAnswer =
        document.querySelector(
            'input[name="challenge3"]:checked'
        );


    if (!selectedAnswer) {

        challenge3Feedback.hidden = false;

        challenge3Feedback.className =
            "challenge-feedback incorrect";

        challenge3Feedback.textContent =
            "Please select an answer before continuing.";

        return;
    }


    try {

        const response = await fetch(
            "/api/challenges/3/answer",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    answer: selectedAnswer.value
                })
            }
        );
        if (!response.ok) {
            throw new Error(
                `Server returned ${response.status}`
            );
        }


        const result = await response.json();


        challenge3Feedback.hidden = false;


        if (result.correct) {
            submitAnswerButton.disabled = true;
            currentScore.textContent =
                `Score: ${result.score} / ${result.total}`;

            challenge3Feedback.className =
                "challenge-feedback correct";

            challenge3Feedback.textContent =
                result.feedback;

            setTimeout(() => {
                showFinalScore(result.score, result.total);
            }, 1000);
        } else {

            challenge3Feedback.className =
                "challenge-feedback incorrect";

            challenge3Feedback.textContent =
                result.feedback;
        }


    } catch (error) {

        console.error(
            "Error checking answer:",
            error
        );

        challenge3Feedback.hidden = false;

        challenge3Feedback.className =
            "challenge-feedback incorrect";

        challenge3Feedback.textContent =
            "Something went wrong while checking your answer. Please try again.";
    }

});


function showFinalScore(score, total) {

    scoreSection.hidden = false;

    scoreDisplay.textContent =
        `${score} / ${total}`;

    if (score === total) {

        scoreMessage.textContent =
            "Excellent! You identified every accessibility issue.";

    } else if (score >= 2) {

        scoreMessage.textContent =
            "Great job! You identified most of the accessibility issues.";

    } else if (score === 1) {

        scoreMessage.textContent =
            "Good start! Keep practicing accessibility concepts.";

    } else {

        scoreMessage.textContent =
            "Keep practicing! Accessibility takes practice.";
    }

    scoreSection.scrollIntoView({
        behavior:
            document.body.classList.contains(
                "reduced-motion"
            )
                ? "auto"
                : "smooth"
    });
}

restartButton.addEventListener("click", async () => {

    try {

        const response = await fetch(
            "/api/challenges/reset",
            {
                method: "POST"
            }
        );

        if (!response.ok) {
            throw new Error(
                `Server returned ${response.status}`
            );
        }

        const result =
            await response.json();

        currentScore.textContent =
            `Score: ${result.score} / ${result.total}`;

        scoreSection.hidden = true;

        document.getElementById(
            "challengeSection"
        ).hidden = false;

        document.getElementById(
            "challenge2Section"
        ).hidden = true;

        document.getElementById(
            "challenge3Section"
        ).hidden = true;

        document.querySelectorAll(
            'input[type="radio"]'
        ).forEach((radio) => {
            radio.checked = false;
        });

        document.querySelectorAll(
            ".challenge-feedback"
        ).forEach((feedback) => {
            feedback.hidden = true;
            feedback.textContent = "";
        });

        document.getElementById(
            "challengeSection"
        ).scrollIntoView({
            behavior:
                document.body.classList.contains(
                    "reduced-motion"
                )
                    ? "auto"
                    : "smooth"
        });

    } catch (error) {

        console.error(
            "Error resetting challenge:",
            error
        );
    }
});