// =========================================================
// NAVBAR FIX
// Sticky navbar + menu section + dropdown hasil
// Tidak mengubah fungsi peta
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const navbar =
            document.getElementById(
                "menu-tesis"
            );

        const hasilBtn =
            document.getElementById(
                "hasilMenuBtn"
            );

        const hasilMenu =
            document.getElementById(
                "hasilSubmenu"
            );


        // =================================================
        // HELPER SCROLL
        // =================================================

        function goToSection(id) {

            const target =
                document.getElementById(id);

            if (!target) {

                console.warn(
                    "Section tidak ditemukan:",
                    id
                );

                return;
            }


            const navHeight =
                navbar
                    ? navbar.offsetHeight
                    : 0;


            const y =
                target
                    .getBoundingClientRect()
                    .top
                +
                window.pageYOffset
                -
                navHeight
                -
                10;


            window.scrollTo({

                top: y,

                behavior: "smooth"

            });

        }



        // =================================================
        // MENU UTAMA
        // =================================================

        if (navbar) {

            navbar.addEventListener(
                "click",
                function (event) {

                    const mainButton =
                        event.target.closest(
                            ".menu-card[data-target]"
                        );


                    if (mainButton) {

                        event.preventDefault();

                        event.stopPropagation();


                        const id =
                            mainButton
                                .getAttribute(
                                    "data-target"
                                );


                        if (hasilMenu) {

                            hasilMenu
                                .classList
                                .remove("show");

                        }


                        if (hasilBtn) {

                            hasilBtn
                                .classList
                                .remove("open");

                        }


                        goToSection(id);

                        return;

                    }



                    // =====================================
                    // ITEM HASIL
                    // =====================================

                    const resultButton =
                        event.target.closest(
                            ".result-card[data-target]"
                        );


                    if (resultButton) {

                        event.preventDefault();

                        event.stopPropagation();


                        const id =
                            resultButton
                                .getAttribute(
                                    "data-target"
                                );


                        if (hasilMenu) {

                            hasilMenu
                                .classList
                                .remove("show");

                        }


                        if (hasilBtn) {

                            hasilBtn
                                .classList
                                .remove("open");

                        }


                        goToSection(id);

                    }

                },

                true
            );

        }



        // =================================================
        // HASIL & PEMBAHASAN
        // =================================================

        if (
            hasilBtn &&
            hasilMenu
        ) {

            hasilBtn.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    event.stopImmediatePropagation();


                    const opened =
                        hasilMenu
                            .classList
                            .contains(
                                "show"
                            );


                    if (opened) {

                        hasilMenu
                            .classList
                            .remove(
                                "show"
                            );

                        hasilBtn
                            .classList
                            .remove(
                                "open"
                            );

                    }

                    else {

                        hasilMenu
                            .classList
                            .add(
                                "show"
                            );

                        hasilBtn
                            .classList
                            .add(
                                "open"
                            );

                    }

                },

                true
            );

        }



        // =================================================
        // MULAI EKSPLORASI
        // =================================================

        const exploreBtn =
            document.getElementById(
                "exploreBtn"
            );


        if (exploreBtn) {

            exploreBtn.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    event.stopImmediatePropagation();

                    goToSection(
                        "menu-tesis"
                    );

                },

                true
            );

        }



        // =================================================
        // NEXT SECTION
        // =================================================

        document
            .querySelectorAll(
                ".next-section[data-target]"
            )
            .forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function (event) {

                            event.preventDefault();

                            event.stopImmediatePropagation();


                            goToSection(

                                button
                                    .getAttribute(
                                        "data-target"
                                    )

                            );

                        },

                        true
                    );

                }
            );



        // =================================================
        // KEMBALI KE MENU
        // =================================================

        document
            .querySelectorAll(
                ".back-menu"
            )
            .forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function (event) {

                            event.preventDefault();

                            event.stopImmediatePropagation();


                            goToSection(
                                "menu-tesis"
                            );

                        },

                        true
                    );

                }
            );



        // =================================================
        // KEMBALI KE HASIL
        // =================================================

        document
            .querySelectorAll(
                ".back-results"
            )
            .forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function (event) {

                            event.preventDefault();

                            event.stopImmediatePropagation();


                            if (
                                hasilMenu &&
                                hasilBtn
                            ) {

                                hasilMenu
                                    .classList
                                    .add(
                                        "show"
                                    );

                                hasilBtn
                                    .classList
                                    .add(
                                        "open"
                                    );

                            }

                        },

                        true
                    );

                }
            );



        // =================================================
        // KLIK DI LUAR DROPDOWN
        // =================================================

        document.addEventListener(
            "click",
            function (event) {

                if (
                    !hasilBtn ||
                    !hasilMenu
                ) {

                    return;

                }


                if (
                    !hasilBtn
                        .contains(
                            event.target
                        )
                    &&
                    !hasilMenu
                        .contains(
                            event.target
                        )
                ) {

                    hasilMenu
                        .classList
                        .remove(
                            "show"
                        );

                    hasilBtn
                        .classList
                        .remove(
                            "open"
                        );

                }

            }
        );


        console.log(
            "NAVBAR FIX AKTIF"
        );

    }
);
document.addEventListener(
    "DOMContentLoaded",
    function () {

        const modal =
            document.getElementById(
                "backgroundModal"
            );

        const modalContent =
            document.getElementById(
                "backgroundModalContent"
            );

        const closeBtn =
            document.getElementById(
                "backgroundModalClose"
            );

        const backdrop =
            document.getElementById(
                "backgroundModalBackdrop"
            );


        document
            .querySelectorAll(
                ".background-card[data-bg-detail]"
            )
            .forEach(
                function (card) {

                    card.addEventListener(
                        "click",
                        function () {

                            const id =
                                card.getAttribute(
                                    "data-bg-detail"
                                );

                            const source =
                                document.getElementById(id);


                            if (
                                !source ||
                                !modal ||
                                !modalContent
                            ) {
                                return;
                            }


                            modalContent.innerHTML =
                                source.innerHTML;

                            modal.classList.add(
                                "show"
                            );

                            document.body.style.overflow =
                                "hidden";

                        }
                    );

                }
            );


        function closeBackgroundModal() {

            if (!modal) {
                return;
            }

            modal.classList.remove(
                "show"
            );

            document.body.style.overflow =
                "";

        }


        if (closeBtn) {

            closeBtn.addEventListener(
                "click",
                closeBackgroundModal
            );

        }


        if (backdrop) {

            backdrop.addEventListener(
                "click",
                closeBackgroundModal
            );

        }


        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape"
                ) {

                    closeBackgroundModal();

                }

            }
        );

    }
);