import Swal from "sweetalert2";
import confetti from "canvas-confetti";
import {useEffect} from "react";

const Home = () => {
    useEffect(() => {
        const hasSeenWelcomeMessage = sessionStorage.getItem("welcomeMessage");{
            if (!hasSeenWelcomeMessage) {
                alertHorseWelcome();
                sessionStorage.setItem("welcomeMessage", "true");
            }
        }
    }, []); 

    const alertHorseWelcome = () => {
        Swal.fire({
            title: "¡Ups!",
            text: "Parece que el unicornio no se siente muy bien de la panza...",
            // imageUrl: "/unicornGif.gif",
            imageWidth: 200,
            imageAlt: "Unicornio enfermo",
            confirmButtonText: "🤮",
        });
    };

    const handleConfetti = () => {
        confetti({
            particleCount: 100,
            startVelocity: 30,
            spread: 45,
            origin: { y: 0.45, x: 0.48 },
            angle: 180,
            
        });
    };
    
    const soundEffect = () => {
        const audio = new Audio('/fart.mp3');
        audio.play();
    }

    const hoverEffect = () => {{
        setTimeout(() => {
            handleConfetti();
        }
        , 300);
        soundEffect();
        }
    }

    return (
        <div className="home-background">
            <div className="welcome-message">
            <h1>¡Bienvenido al Mundo de Unicornios!</h1>
            <p>Mi nombre es Gonzalo Toledo y este es mi primer proyecto con React.</p>
            <a href="/unicornios/crear" onMouseOver={hoverEffect}>
                <img src="/unicornGif.gif" alt="" />
            </a>
            <p>¿Qué esperas para crear tu primer unicornio?</p>
        </div>
    </div>
    );
};

export default Home;
