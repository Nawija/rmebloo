"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
    // Referencje do elementów audio
    const radioRef = useRef<HTMLAudioElement>(null);
    const announcementRef = useRef<HTMLAudioElement>(null);

    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (!isPlaying) return;

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
    }, [isPlaying]);

    const startRadio = () => {
        if (radioRef.current) {
            radioRef.current.play();
            setIsPlaying(true);
        }
    };
    const stopRadio = () => {
        if (radioRef.current) {
            radioRef.current.pause();
            setIsPlaying(false);
        }
    };

    return (
        <div className="flex items-center justify-center flex-col h-screen w-full bg-gradient-to-t from-black to-emerald-800 space-y-6">
            <div className="absolute top-12 left-1/2 -translate-x-1/2 w-full flex items-center justify-center">
                <img
                    className="h-auto w-96"
                    src="https://mebloo.pl/img/logo.png"
                />
            </div>
            <h1 className="text-4xl text-white">Radio RMF Online</h1>
            {!isPlaying ? (
                <button
                    onClick={startRadio}
                    className="bg-blue-500 text-white px-4 py-2 rounded text-sm font-medium"
                >
                    Start Radio
                </button>
            ) : (
                <button
                    onClick={stopRadio}
                    className="bg-red-500 text-white px-4 py-2 rounded text-sm font-medium"
                >
                    Na Żywo
                </button>
            )}
            {/* Odtwarzacz radia */}
            <audio ref={radioRef} src="http://rmfstream1.interia.pl/rmf_24" />
        </div>
    );
}
