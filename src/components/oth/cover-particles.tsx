"use client"

import { useEffect, useState } from "react";

import { loadSlim } from "@tsparticles/slim";
import Particles, { initParticlesEngine } from "@tsparticles/react";

export const CoverParticles = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        // Use requestIdleCallback to defer particles loading until browser is idle
        // This prevents blocking the main thread and improves LCP
        const loadParticles = () => {
            initParticlesEngine(async (engine) => {
                await loadSlim(engine);
            }).then(() => {
                setInit(true);
            });
        };

        if ('requestIdleCallback' in window) {
            requestIdleCallback(loadParticles);
        } else {
            // Fallback for browsers without requestIdleCallback
            setTimeout(loadParticles, 1000);
        }
    }, []);

    return (
        init &&
        <div className="w-[0px]">
            <Particles
                id="tsparticles"
                options={{
                    fpsLimit: 60, // Reduced from 120 to 60 for better performance
                    interactivity: {
                        events: {
                            onClick: {
                                enable: true,
                                mode: "push",
                            },
                            onHover: {
                                enable: true,
                                mode: "repulse",
                            },
                        },
                        modes: {
                            push: {
                                quantity: 2, // Reduced from 4 to 2
                            },
                            repulse: {
                                distance: 200,
                                duration: 0.4,
                            },
                        },
                    },
                    particles: {
                        color: {
                            value: "#ffffff",
                        },
                        links: {
                            color: "#ffffff",
                            distance: 150,
                            enable: true,
                            opacity: 0.5,
                            width: 1,
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outModes: {
                                default: "bounce",
                            },
                            random: false,
                            speed: 1,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                            },
                            value: 40, // Reduced from 80 to 40 for better performance
                        },
                        opacity: {
                            value: 0.5,
                        },
                        shape: {
                            type: "circle",
                        },
                        size: {
                            value: { min: 1, max: 5 },
                        },
                    },
                    detectRetina: true,
                }}

            />
        </div>
    )
};