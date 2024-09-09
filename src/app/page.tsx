import { useEffect, useRef } from "react";

export default function Home() {
    // Referencje do elementów audio
    const radioRef = useRef<HTMLAudioElement>(null);
    const announcementRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        // Funkcja do odtwarzania komunikatu
        const playAnnouncement = () => {
            if (radioRef.current && announcementRef.current) {
                radioRef.current.pause(); // Wstrzymaj muzykę
                announcementRef.current.play(); // Odtwórz komunikat

                // Po zakończeniu komunikatu wróć do muzyki
                announcementRef.current.onended = () => {
                    radioRef.current?.play();
                };
            }
        };

        // Ustaw interwał co 30 minut
        const interval = setInterval(playAnnouncement, 1800000);

        return () => clearInterval(interval); // Wyczyść interwał przy unmount
    }, []);

    return (
        <div>
            <h1>Radio RMF Online</h1>
            {/* Odtwarzacz radia */}
            <audio
                ref={radioRef}
                src="https://www.rmfon.pl/stacja/rmf-fm"
                autoPlay
            />
            {/* Komunikat audio */}
            <audio ref={announcementRef} src="/src/komunikat.mp3" />
        </div>
    );
}
