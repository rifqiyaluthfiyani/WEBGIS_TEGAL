// =========================================================
// WEBGIS TESIS KOTA TEGAL
// FULL SCRIPT FINAL
// Navigation + RQ + Metode + Story Map + DSAS + CVI
// =========================================================


// =========================================================
// 1. HELPER
// =========================================================

function scrollToSection(id) {
    const el = document.getElementById(id);

    if (el) {
        el.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}


function formatNumber(value, digits = 2) {

    const n = Number(value);

    if (!Number.isFinite(n)) {
        return value ?? "-";
    }

    return n.toLocaleString("id-ID", {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits
    });
}


function extendBoundsRecursive(bounds, coordinates) {

    if (!Array.isArray(coordinates)) return;

    if (
        coordinates.length >= 2 &&
        typeof coordinates[0] === "number" &&
        typeof coordinates[1] === "number"
    ) {

        bounds.extend(coordinates);

        return;
    }


    coordinates.forEach(function(child) {

        extendBoundsRecursive(
            bounds,
            child
        );

    });
}


function normalizeText(value) {

    return String(value ?? "")
        .trim()
        .toLowerCase()
        .replace(/[_-]+/g, " ")
        .replace(/\s+/g, " ");
}



// =========================================================
// 2. NAVIGASI
// =========================================================

function initNavigation() {

    const exploreBtn =
        document.getElementById(
            "exploreBtn"
        );


    if (exploreBtn) {

        exploreBtn.addEventListener(
            "click",
            function() {

                scrollToSection(
                    "menu-tesis"
                );

            }
        );

    }


    document
        .querySelectorAll(
            ".menu-card[data-target]"
        )
        .forEach(function(btn) {

            btn.addEventListener(
                "click",
                function() {

                    scrollToSection(
                        btn.getAttribute(
                            "data-target"
                        )
                    );

                }
            );

        });


    const hasilMenuBtn =
        document.getElementById(
            "hasilMenuBtn"
        );


    const hasilSubmenu =
        document.getElementById(
            "hasilSubmenu"
        );


    if (
        hasilMenuBtn &&
        hasilSubmenu
    ) {

        hasilMenuBtn.addEventListener(
            "click",
            function() {

                hasilSubmenu
                    .classList
                    .toggle("show");


                hasilMenuBtn
                    .classList
                    .toggle("open");


                if (
                    hasilSubmenu
                        .classList
                        .contains("show")
                ) {

                    setTimeout(
                        function() {

                            hasilSubmenu
                                .scrollIntoView({

                                    behavior:
                                        "smooth",

                                    block:
                                        "center"

                                });

                        },

                        100
                    );

                }

            }
        );

    }


    document
        .querySelectorAll(
            ".result-card[data-target]"
        )
        .forEach(function(btn) {

            btn.addEventListener(
                "click",
                function() {

                    scrollToSection(
                        btn.getAttribute(
                            "data-target"
                        )
                    );

                }
            );

        });


    document
        .querySelectorAll(
            ".back-menu"
        )
        .forEach(function(btn) {

            btn.addEventListener(
                "click",
                function() {

                    scrollToSection(
                        "menu-tesis"
                    );

                }
            );

        });


    document
        .querySelectorAll(
            ".back-results"
        )
        .forEach(function(btn) {

            btn.addEventListener(
                "click",
                function() {

                    if (hasilSubmenu) {

                        hasilSubmenu
                            .classList
                            .add("show");

                    }


                    if (hasilMenuBtn) {

                        hasilMenuBtn
                            .classList
                            .add("open");

                    }


                    setTimeout(
                        function() {

                            if (hasilSubmenu) {

                                hasilSubmenu
                                    .scrollIntoView({

                                        behavior:
                                            "smooth",

                                        block:
                                            "center"

                                    });

                            }

                        },

                        100
                    );

                }
            );

        });


    document
        .querySelectorAll(
            ".next-section[data-target]"
        )
        .forEach(function(btn) {

            btn.addEventListener(
                "click",
                function() {

                    scrollToSection(
                        btn.getAttribute(
                            "data-target"
                        )
                    );

                }
            );

        });

}



// =========================================================
// 3. RESEARCH QUESTIONS
// =========================================================

function initResearchQuestions() {

    const cards =
        document.querySelectorAll(
            ".rq-main-card[data-rq]"
        );


    cards.forEach(function(card) {

        card.addEventListener(
            "click",
            function() {

                const id =
                    card.getAttribute(
                        "data-rq"
                    );


                const detail =
                    document.getElementById(
                        id
                    );


                if (!detail) return;


                const opened =
                    detail
                        .classList
                        .contains("show");


                document
                    .querySelectorAll(
                        ".rq-detail"
                    )
                    .forEach(
                        function(el) {

                            el
                                .classList
                                .remove("show");

                        }
                    );


                cards.forEach(
                    function(el) {

                        el
                            .classList
                            .remove("active");

                    }
                );


                if (!opened) {

                    detail
                        .classList
                        .add("show");


                    card
                        .classList
                        .add("active");

                }

            }
        );

    });

}



// =========================================================
// 4. METODE
// =========================================================

function initMethodSteps() {

    const steps =
        document.querySelectorAll(
            ".method-step[data-method]"
        );


    steps.forEach(function(step) {

        step.addEventListener(
            "click",
            function() {

                const id =
                    step.getAttribute(
                        "data-method"
                    );


                const detail =
                    document.getElementById(
                        id
                    );


                if (!detail) return;


                const opened =
                    detail
                        .classList
                        .contains("show");


                document
                    .querySelectorAll(
                        ".method-detail"
                    )
                    .forEach(
                        function(el) {

                            el
                                .classList
                                .remove("show");

                        }
                    );


                steps.forEach(
                    function(el) {

                        el
                            .classList
                            .remove("active");

                    }
                );


                if (!opened) {

                    detail
                        .classList
                        .add("show");


                    step
                        .classList
                        .add("active");

                }

            }
        );

    });

}



// =========================================================
// 5. STORY MAP
// =========================================================

let storyMap = null;

let storyMapInitialized = false;


let storyMapCenter = [

    109.13,
    -6.87

];


function makeOsmStyle(id) {

    return {

        version:
            8,


        sources: {

            osm: {

                type:
                    "raster",

                tiles: [

                    "https://tile.openstreetmap.org/{z}/{x}/{y}.png"

                ],

                tileSize:
                    256,

                attribution:
                    "© OpenStreetMap contributors"

            }

        },


        layers: [

            {

                id:
                    id,

                type:
                    "raster",

                source:
                    "osm"

            }

        ]

    };

}



function initStoryMap() {

    if (
        storyMapInitialized
    ) {
        return;
    }


    const container =
        document.getElementById(
            "storyMap"
        );


    if (
        !container ||
        typeof maplibregl ===
        "undefined"
    ) {
        return;
    }


    storyMapInitialized =
        true;


    storyMap =
        new maplibregl.Map({

            container:
                "storyMap",

            style:
                makeOsmStyle(
                    "osm-story"
                ),

            center:
                storyMapCenter,

            zoom:
                11.5

        });


    storyMap.addControl(

        new maplibregl
            .NavigationControl(),

        "top-right"

    );


    storyMap.on(
        "load",

        async function() {

            try {

                const response =
                    await fetch(
                        "Data/BATAS_TEGAL.geojson"
                    );


                if (
                    !response.ok
                ) {

                    throw new Error(
                        "BATAS_TEGAL.geojson tidak ditemukan"
                    );

                }


                const data =
                    await response.json();


                storyMap.addSource(

                    "batas-tegal-story",

                    {

                        type:
                            "geojson",

                        data:
                            data

                    }

                );


                storyMap.addLayer({

                    id:
                        "batas-tegal-fill",

                    type:
                        "fill",

                    source:
                        "batas-tegal-story",

                    paint: {

                        "fill-color":
                            "#177f7b",

                        "fill-opacity":
                            0.16

                    }

                });


                storyMap.addLayer({

                    id:
                        "batas-tegal-outline",

                    type:
                        "line",

                    source:
                        "batas-tegal-story",

                    paint: {

                        "line-color":
                            "#123447",

                        "line-width":
                            2.5

                    }

                });


                const bounds =
                    new maplibregl
                        .LngLatBounds();


                (
                    data.features || []
                )
                    .forEach(
                        function(feature) {

                            if (
                                feature
                                    ?.geometry
                                    ?.coordinates
                            ) {

                                extendBoundsRecursive(

                                    bounds,

                                    feature
                                        .geometry
                                        .coordinates

                                );

                            }

                        }
                    );


                if (
                    !bounds.isEmpty()
                ) {

                    const center =
                        bounds.getCenter();


                    storyMapCenter = [

                        center.lng,
                        center.lat

                    ];


                    storyMap.fitBounds(

                        bounds,

                        {

                            padding:
                                45,

                            maxZoom:
                                12.5

                        }

                    );

                }

            }

            catch(error) {

                console.error(
                    "ERROR STORY MAP:",
                    error
                );

            }

        }
    );

}



// =========================================================
// STORY PANELS
// PETA + CAPTION + FOTO KONTEKS
// =========================================================

function initStoryPanels() {


    const panels =
        document.querySelectorAll(
            ".story-panel"
        );


    const caption =
        document.getElementById(
            "storyCaption"
        );


    const popup =
        document.getElementById(
            "storyImagePopup"
        );


    const popupImage =
        document.getElementById(
            "storyPopupImage"
        );


    const popupTitle =
        document.getElementById(
            "storyPopupTitle"
        );


    if (!panels.length) {

        return;

    }



    // =====================================================
    // PANEL YANG SEDANG AKTIF
    // =====================================================

    function activate(panel) {


        // ---------------------------------------------
        // ACTIVE STATE
        // ---------------------------------------------

        panels.forEach(
            function(element) {

                element
                    .classList
                    .remove(
                        "active"
                    );

            }
        );


        panel
            .classList
            .add(
                "active"
            );



        // ---------------------------------------------
        // DATA PANEL
        // ---------------------------------------------

        const text =
            panel.getAttribute(
                "data-caption"
            );


        const zoom =
            Number(
                panel.getAttribute(
                    "data-zoom"
                )
            );


        const image =
            panel.getAttribute(
                "data-image"
            );


        const imageTitle =
            panel.getAttribute(
                "data-image-title"
            );



        // ---------------------------------------------
        // CAPTION PETA
        // ---------------------------------------------

        if (
            caption &&
            text
        ) {

            caption.textContent =
                text;

        }



        // ---------------------------------------------
        // ZOOM PETA
        // ---------------------------------------------

        if (
            storyMap &&
            storyMap.loaded() &&
            Number.isFinite(zoom)
        ) {

            storyMap.easeTo({

                center:
                    storyMapCenter,

                zoom:
                    zoom,

                duration:
                    700

            });

        }



        // ---------------------------------------------
        // FOTO POPUP
        // ---------------------------------------------

        if (
            popup &&
            popupImage &&
            image
        ) {


            // Kalau gambar sudah sama,
            // tidak perlu animasi ulang

            const currentImage =
                popupImage.getAttribute(
                    "src"
                );


            if (
                currentImage === image
            ) {

                if (
                    popupTitle &&
                    imageTitle
                ) {

                    popupTitle.textContent =
                        imageTitle;

                }

                return;

            }



            popup
                .classList
                .add(
                    "changing"
                );


            setTimeout(
                function() {


                    popupImage.src =
                        image;


                    popupImage.alt =
                        imageTitle ||
                        "Visual konteks penelitian";


                    if (
                        popupTitle &&
                        imageTitle
                    ) {

                        popupTitle.textContent =
                            imageTitle;

                    }


                    popup
                        .classList
                        .remove(
                            "changing"
                        );


                },

                150
            );

        }

    }



    // =====================================================
    // PANEL PERTAMA
    // =====================================================

    activate(
        panels[0]
    );



    // =====================================================
    // SCROLL OBSERVER
    // =====================================================

    const observer =
        new IntersectionObserver(

            function(entries) {


                const visible =
                    entries

                        .filter(
                            function(entry) {

                                return (
                                    entry.isIntersecting
                                );

                            }
                        )

                        .sort(
                            function(a, b) {

                                return (
                                    b.intersectionRatio -
                                    a.intersectionRatio
                                );

                            }
                        );


                if (
                    visible.length
                ) {

                    activate(
                        visible[0].target
                    );

                }

            },


            {

                rootMargin:
                    "-20% 0px -30% 0px",

                threshold: [
                    0.15,
                    0.30,
                    0.50,
                    0.70
                ]

            }

        );



    panels.forEach(
        function(panel) {

            observer.observe(
                panel
            );

        }
    );

}

// =========================================================
// 7. DSAS MAP
// =========================================================

let dsasMap = null;

let dsasMapInitialized = false;


// Menyimpan bounds seluruh DSAS
let dsasFullBounds = null;


// =========================================================
// HELPER — NORMALISASI NAMA TRANSEK
// =========================================================

function normalizeDsasTransectId(raw) {

    let value =
        String(raw ?? "")
            .trim()
            .toUpperCase();


    // T2 -> T02
    // T02 -> T02
    const match =
        value.match(
            /^T0*(\d+)$/
        );


    if (match) {

        return (
            "T" +
            match[1].padStart(
                2,
                "0"
            )
        );

    }


    return value;

}


// =========================================================
// HELPER — AMBIL ID TRANSEK
// FIELD UTAMA: NAMA_TITIK
// =========================================================

function getDsasTransectId(properties) {

    return normalizeDsasTransectId(

        properties?.NAMA_TITIK ??
        properties?.Nama_Titik ??
        properties?.Nama_tit_1 ??
        ""

    );

}


// =========================================================
// HELPER — KOORDINAT REKURSIF UNTUK BOUNDS
// =========================================================

function extendDsasBounds(
    bounds,
    coordinates
) {

    if (!coordinates) {
        return;
    }


    if (
        Array.isArray(coordinates) &&
        typeof coordinates[0] === "number" &&
        typeof coordinates[1] === "number"
    ) {

        bounds.extend(
            coordinates
        );

        return;

    }


    if (
        Array.isArray(coordinates)
    ) {

        coordinates.forEach(
            function(item) {

                extendDsasBounds(
                    bounds,
                    item
                );

            }
        );

    }

}


// =========================================================
// HELPER — KUMPULKAN SEMUA KOORDINAT GARIS
// =========================================================

function collectDsasCoordinates(
    coordinates,
    output
) {

    if (!coordinates) {
        return;
    }


    if (
        Array.isArray(coordinates) &&
        typeof coordinates[0] === "number" &&
        typeof coordinates[1] === "number"
    ) {

        output.push(
            coordinates
        );

        return;

    }


    if (
        Array.isArray(coordinates)
    ) {

        coordinates.forEach(
            function(item) {

                collectDsasCoordinates(
                    item,
                    output
                );

            }
        );

    }

}


// =========================================================
// HELPER — TITIK TENGAH FEATURE
// Dipakai agar label highlight selalu muncul
// =========================================================

function getDsasFeatureMidpoint(
    feature
) {

    const coords = [];


    collectDsasCoordinates(

        feature?.geometry?.coordinates,

        coords

    );


    if (!coords.length) {

        return null;

    }


    return coords[
        Math.floor(
            coords.length / 2
        )
    ];

}


// =========================================================
// INIT DSAS MAP
// =========================================================

function initDsasMap() {


    if (
        dsasMapInitialized
    ) {

        return;

    }


    const container =
        document.getElementById(
            "dsasMap"
        );


    if (
        !container ||
        typeof maplibregl ===
        "undefined"
    ) {

        return;

    }


    dsasMapInitialized =
        true;



    // =====================================================
    // BUAT MAP
    // =====================================================

    dsasMap =
        new maplibregl.Map({

            container:
                "dsasMap",

            style:
                makeOsmStyle(
                    "osm-dsas"
                ),

            center: [

                109.13,
                -6.845

            ],

            zoom:
                11

        });



    dsasMap.addControl(

        new maplibregl
            .NavigationControl(),

        "top-right"

    );



    // =====================================================
    // LOAD
    // =====================================================

    dsasMap.on(
        "load",

        async function() {


            try {


                const response =
                    await fetch(
                        "Data/ANALISIS_DSAS.geojson"
                    );


                if (
                    !response.ok
                ) {

                    throw new Error(
                        "ANALISIS_DSAS.geojson tidak ditemukan"
                    );

                }


                const data =
                    await response.json();



                // =================================================
                // SOURCE UTAMA
                // =================================================

                dsasMap.addSource(

                    "dsas-data",

                    {

                        type:
                            "geojson",

                        data:
                            data

                    }

                );



                // =================================================
                // GARIS DSAS
                // =================================================

                dsasMap.addLayer({

                    id:
                        "dsas-lines",

                    type:
                        "line",

                    source:
                        "dsas-data",

                    layout: {

                        "line-cap":
                            "round",

                        "line-join":
                            "round"

                    },

                    paint: {

                        "line-width": [

                            "interpolate",

                            ["linear"],

                            ["zoom"],

                            10,
                            3,

                            13,
                            6,

                            16,
                            8

                        ],


                        "line-opacity":
                            1,


                        "line-color": [

                            "case",


                            // Abrasi tinggi
                            [
                                "<=",

                                [
                                    "to-number",
                                    ["get", "LRR"]
                                ],

                                -2
                            ],

                            "#b2182b",


                            // Abrasi sedang
                            [
                                "all",

                                [
                                    ">",

                                    [
                                        "to-number",
                                        ["get", "LRR"]
                                    ],

                                    -2
                                ],

                                [
                                    "<",

                                    [
                                        "to-number",
                                        ["get", "LRR"]
                                    ],

                                    -0.5
                                ]

                            ],

                            "#ef8a62",


                            // Stabil
                            [
                                "all",

                                [
                                    ">=",

                                    [
                                        "to-number",
                                        ["get", "LRR"]
                                    ],

                                    -0.5
                                ],

                                [
                                    "<=",

                                    [
                                        "to-number",
                                        ["get", "LRR"]
                                    ],

                                    0.5
                                ]

                            ],

                            "#d7b83e",


                            // Akresi sedang
                            [
                                "all",

                                [
                                    ">",

                                    [
                                        "to-number",
                                        ["get", "LRR"]
                                    ],

                                    0.5
                                ],

                                [
                                    "<",

                                    [
                                        "to-number",
                                        ["get", "LRR"]
                                    ],

                                    2
                                ]

                            ],

                            "#67a9cf",


                            // Akresi tinggi
                            [
                                ">=",

                                [
                                    "to-number",
                                    ["get", "LRR"]
                                ],

                                2
                            ],

                            "#2166ac",


                            "#666666"

                        ]

                    }

                });



                // =================================================
                // LABEL SEMUA TRANSEK
                //
                // Hanya muncul ketika zoom cukup dekat.
                // Field: NAMA_TITIK
                // =================================================

                dsasMap.addLayer({

                    id:
                        "dsas-transect-labels",

                    type:
                        "symbol",

                    source:
                        "dsas-data",

                    minzoom:
                        13.2,

                    layout: {

                        "symbol-placement":
                            "line",

                        "text-field": [

                            "coalesce",

                            ["get", "NAMA_TITIK"],

                            ""

                        ],

                        "text-size": [

                            "interpolate",

                            ["linear"],

                            ["zoom"],

                            13,
                            10,

                            15,
                            12,

                            17,
                            14

                        ],

                        "text-allow-overlap":
                            false,

                        "text-ignore-placement":
                            false,

                        "symbol-spacing":
                            100,

                        "text-rotation-alignment":
                            "map",

                        "text-pitch-alignment":
                            "viewport"

                    },

                    paint: {

                        "text-color":
                            "#123746",

                        "text-halo-color":
                            "#ffffff",

                        "text-halo-width":
                            2,

                        "text-halo-blur":
                            0.5

                    }

                });



                // =================================================
                // BOUNDS SELURUH DATA
                // =================================================

                dsasFullBounds =
                    new maplibregl
                        .LngLatBounds();


                (
                    data.features ||
                    []
                )
                    .forEach(
                        function(feature) {

                            if (
                                feature
                                    ?.geometry
                                    ?.coordinates
                            ) {

                                extendDsasBounds(

                                    dsasFullBounds,

                                    feature
                                        .geometry
                                        .coordinates

                                );

                            }

                        }
                    );



                if (
                    !dsasFullBounds.isEmpty()
                ) {

                    dsasMap.fitBounds(

                        dsasFullBounds,

                        {

                            padding:
                                55,

                            maxZoom:
                                13.5

                        }

                    );

                }



                // =================================================
                // POPUP KLIK TRANSEK
                // =================================================

                dsasMap.on(

                    "click",

                    "dsas-lines",

                    function(e) {


                        const props =
                            e.features?.[0]
                                ?.properties ||
                            {};


                        const nama =
                            getDsasTransectId(
                                props
                            ) ||
                            "-";


                        const kategori =

                            props.Kategori ??

                            props.Kategori_1 ??

                            "-";



                        const html = `

                            <div class="dsas-popup">

                                <div class="dsas-popup-header">

                                    <span>
                                        TRANSEK
                                    </span>

                                    <strong>
                                        ${nama}
                                    </strong>

                                </div>


                                <div class="dsas-popup-body">

                                    <div class="popup-row">

                                        <span>
                                            Kategori
                                        </span>

                                        <b>
                                            ${kategori}
                                        </b>

                                    </div>


                                    <div class="popup-row">

                                        <span>
                                            LRR
                                        </span>

                                        <b>
                                            ${formatNumber(props.LRR)} m/tahun
                                        </b>

                                    </div>


                                    <div class="popup-row">

                                        <span>
                                            EPR
                                        </span>

                                        <b>
                                            ${formatNumber(props.EPR)} m/tahun
                                        </b>

                                    </div>


                                    <div class="popup-row">

                                        <span>
                                            NSM
                                        </span>

                                        <b>
                                            ${formatNumber(props.NSM)} m
                                        </b>

                                    </div>


                                    <div class="popup-row">

                                        <span>
                                            SCE
                                        </span>

                                        <b>
                                            ${formatNumber(props.SCE)} m
                                        </b>

                                    </div>


                                    <div class="popup-row">

                                        <span>
                                            Geomorfologi
                                        </span>

                                        <b>
                                            ${props.Geom_IA ?? "-"}
                                        </b>

                                    </div>

                                </div>

                            </div>

                        `;



                        new maplibregl.Popup({

                            maxWidth:
                                "320px"

                        })

                            .setLngLat(
                                e.lngLat
                            )

                            .setHTML(
                                html
                            )

                            .addTo(
                                dsasMap
                            );

                    }

                );



                // =================================================
                // CURSOR
                // =================================================

                dsasMap.on(

                    "mouseenter",

                    "dsas-lines",

                    function() {

                        dsasMap
                            .getCanvas()
                            .style
                            .cursor =
                            "pointer";

                    }

                );


                dsasMap.on(

                    "mouseleave",

                    "dsas-lines",

                    function() {

                        dsasMap
                            .getCanvas()
                            .style
                            .cursor =
                            "";

                    }

                );



                // =================================================
                // BARU SETELAH PETA SELESAI:
                // INIT TEMUAN SPASIAL
                // =================================================

                initDsasSpatialFindings(
                    data
                );


            }

            catch(error) {

                console.error(
                    "ERROR DSAS:",
                    error
                );

            }

        }
    );

}



// =========================================================
// 8. DSAS SPATIAL FINDINGS
// Temuan → highlight + label + zoom
// =========================================================

function initDsasSpatialFindings(
    data
) {


    if (
        !dsasMap ||
        !data
    ) {

        return;

    }


    const buttons =
        document.querySelectorAll(
            ".dsas-finding-btn"
        );


    if (!buttons.length) {

        return;

    }



    // =====================================================
    // DEFINISI TEMUAN
    // =====================================================

    const findings = {


        // 3 klaster abrasi

        "abrasion-clusters": [

            "T02",
            "T03",
            "T04",

            "T06",
            "T07",

            "T14",
            "T15",
            "T16",
            "T17",

            "T36",
            "T37",
            "T38",
            "T39",
            "T40",
            "T41"

        ],



        // abrasi maksimum

        "maximum-abrasion": [

            "T36"

        ],



        // stabil-akresi

        "stable-accretion": [

            "T24",
            "T25",
            "T26",
            "T27",
            "T28",
            "T29",
            "T30",
            "T31",
            "T32",
            "T33",
            "T34",
            "T35"

        ]

    };



    // =====================================================
    // SOURCE GARIS HIGHLIGHT
    // =====================================================

    if (
        !dsasMap.getSource(
            "dsas-finding-highlight"
        )
    ) {

        dsasMap.addSource(

            "dsas-finding-highlight",

            {

                type:
                    "geojson",

                data: {

                    type:
                        "FeatureCollection",

                    features:
                        []

                }

            }

        );



        // Outline putih

        dsasMap.addLayer({

            id:
                "dsas-finding-outline",

            type:
                "line",

            source:
                "dsas-finding-highlight",

            paint: {

                "line-color":
                    "#ffffff",

                "line-width":
                    10,

                "line-opacity":
                    0.90

            }

        });



        // Garis highlight

        dsasMap.addLayer({

            id:
                "dsas-finding-line",

            type:
                "line",

            source:
                "dsas-finding-highlight",

            paint: {

                "line-color":
                    "#111111",

                "line-width":
                    6,

                "line-opacity":
                    1

            }

        });

    }



    // =====================================================
    // SOURCE POINT UNTUK LABEL
    //
    // Label dibuat sebagai titik tengah masing-masing
    // feature agar NAMA_TITIK PASTI muncul.
    // =====================================================

    if (
        !dsasMap.getSource(
            "dsas-finding-label-points"
        )
    ) {

        dsasMap.addSource(

            "dsas-finding-label-points",

            {

                type:
                    "geojson",

                data: {

                    type:
                        "FeatureCollection",

                    features:
                        []

                }

            }

        );



        // =================================================
        // LABEL TRANSEK YANG DIPILIH
        // =================================================

        dsasMap.addLayer({

            id:
                "dsas-finding-labels",

            type:
                "symbol",

            source:
                "dsas-finding-label-points",

            layout: {

                "text-field": [

                    "get",
                    "NAMA_TITIK"

                ],

                "text-size":
                    15,

                "text-anchor":
                    "bottom",

                "text-offset": [
                    0,
                    -0.6
                ],

                "text-allow-overlap":
                    true,

                "text-ignore-placement":
                    true

            },

            paint: {

                "text-color":
                    "#111111",

                "text-halo-color":
                    "#ffffff",

                "text-halo-width":
                    3,

                "text-halo-blur":
                    0.4

            }

        });

    }



    // =====================================================
    // MEMBUAT LABEL POINT DARI FEATURE TERPILIH
    // =====================================================

    function createLabelPoints(
        selected
    ) {


        const labelFeatures =
            [];


        selected.forEach(
            function(feature) {


                const midpoint =
                    getDsasFeatureMidpoint(
                        feature
                    );


                if (!midpoint) {

                    return;

                }


                const id =
                    getDsasTransectId(
                        feature.properties ||
                        {}
                    );


                labelFeatures.push({

                    type:
                        "Feature",

                    geometry: {

                        type:
                            "Point",

                        coordinates:
                            midpoint

                    },

                    properties: {

                        NAMA_TITIK:
                            id

                    }

                });

            }
        );


        return {

            type:
                "FeatureCollection",

            features:
                labelFeatures

        };

    }



    // =====================================================
    // TAMPILKAN TEMUAN
    // =====================================================

    function showFinding(
        findingKey
    ) {


        const ids =
            findings[
                findingKey
            ] ||
            [];


        // =================================================
        // FILTER FEATURE
        // =================================================

        const selected =
            (
                data.features ||
                []
            )
                .filter(
                    function(feature) {


                        const id =
                            getDsasTransectId(

                                feature.properties ||
                                {}

                            );


                        return ids.includes(
                            id
                        );

                    }
                );



        console.log(
            "TEMUAN:",
            findingKey
        );


        console.log(
            "DICARI:",
            ids
        );


        console.log(
            "DITEMUKAN:",
            selected.map(
                function(feature) {

                    return getDsasTransectId(
                        feature.properties ||
                        {}
                    );

                }
            )
        );



        if (
            !selected.length
        ) {

            console.warn(
                "Tidak ada transek ditemukan untuk:",
                findingKey
            );

            return;

        }



        // =================================================
        // UPDATE GARIS HIGHLIGHT
        // =================================================

        dsasMap
            .getSource(
                "dsas-finding-highlight"
            )
            .setData({

                type:
                    "FeatureCollection",

                features:
                    selected

            });



        // =================================================
        // UPDATE LABEL NAMA TITIK
        // =================================================

        dsasMap
            .getSource(
                "dsas-finding-label-points"
            )
            .setData(

                createLabelPoints(
                    selected
                )

            );



        // =================================================
        // SATU TRANSEK:
        // FLY KE TITIK TENGAH
        // =================================================

        if (
            selected.length === 1
        ) {


            const center =
                getDsasFeatureMidpoint(
                    selected[0]
                );


            if (center) {

                dsasMap.flyTo({

                    center:
                        center,

                    zoom:
                        16,

                    duration:
                        1200,

                    essential:
                        true

                });

            }


            return;

        }



        // =================================================
        // BANYAK TRANSEK:
        // FIT BOUNDS
        // =================================================

        const bounds =
            new maplibregl
                .LngLatBounds();


        selected.forEach(
            function(feature) {

                if (
                    feature
                        ?.geometry
                        ?.coordinates
                ) {

                    extendDsasBounds(

                        bounds,

                        feature
                            .geometry
                            .coordinates

                    );

                }

            }
        );



        if (
            !bounds.isEmpty()
        ) {

            dsasMap.fitBounds(

                bounds,

                {

                    padding: {

                        top:
                            90,

                        right:
                            90,

                        bottom:
                            90,

                        left:
                            90

                    },

                    maxZoom:
                        14.5,

                    duration:
                        1100

                }

            );

        }

    }



    // =====================================================
    // BUTTON
    // =====================================================

    buttons.forEach(
        function(button) {


            button.addEventListener(
                "click",

                function() {


                    buttons.forEach(
                        function(item) {

                            item
                                .classList
                                .remove(
                                    "active"
                                );

                        }
                    );


                    button
                        .classList
                        .add(
                            "active"
                        );


                    showFinding(

                        button.getAttribute(
                            "data-finding"
                        )

                    );

                }

            );

        }
    );



    // =====================================================
    // RESET
    // =====================================================

    const reset =
        document.getElementById(
            "dsasResetView"
        );


    if (reset) {

        reset.addEventListener(
            "click",

            function() {


                // hilangkan active button

                buttons.forEach(
                    function(item) {

                        item
                            .classList
                            .remove(
                                "active"
                            );

                    }
                );



                // kosongkan highlight

                dsasMap
                    .getSource(
                        "dsas-finding-highlight"
                    )
                    .setData({

                        type:
                            "FeatureCollection",

                        features:
                            []

                    });



                // kosongkan label pilihan

                dsasMap
                    .getSource(
                        "dsas-finding-label-points"
                    )
                    .setData({

                        type:
                            "FeatureCollection",

                        features:
                            []

                    });



                // kembali ke seluruh data

                if (
                    dsasFullBounds &&
                    !dsasFullBounds.isEmpty()
                ) {

                    dsasMap.fitBounds(

                        dsasFullBounds,

                        {

                            padding:
                                55,

                            maxZoom:
                                13.5,

                            duration:
                                1000

                        }

                    );

                }

            }

        );

    }

}


// =========================================================
// 8. CVI GLOBAL
// =========================================================

let cviMap = null;

let cviMapInitialized = false;

let cviGeoJSON = null;

let cviActiveParameter =
    "CVI_TOTAL";

let cviLinePopup = null;



// =========================================================
// 9. FIELD ASLI CVI
// =========================================================

const CVI_FIELDS = {

    shoreline:
        "SKOR_SHORE",

    geom:
        "SKOR_GEOM",

    geomRaw:
        "GEOM_LAP",

    slope:
        "SKOR_SLOPE",

    elev:
        "SKOR_ELEV",

    wave:
        "SKOR_GEL",

    tide:
        "SKOR_PASUT",

    slr:
        "SKOR_SLR",

    land:
        "SKOR_LAHAN",

    landRaw:
        "LAHAN",

    landType:
        "JENIS",

    cvi:
        "CVI",

    cviClass:
        "KELAS_CVI",

    cviClassText:
        "KELAS_CV_1"

};



// =========================================================
// 10. INFORMASI PARAMETER CVI
// =========================================================

const cviParameterInfo = {

    SKOR_SHORE: {

        title:
            "Dinamika Garis Pantai",

        shortTitle:
            "Shoreline",

        text:
            "Parameter shoreline menunjukkan kecenderungan akresi, stabilitas, atau abrasi pada setiap segmen pesisir."

    },


    SKOR_GEOM: {

        title:
            "Geomorfologi Pantai",

        shortTitle:
            "Geomorfologi",

        text:
            "Geomorfologi menunjukkan karakter material dan bentuklahan pesisir yang memengaruhi ketahanan pantai terhadap erosi."

    },


    SKOR_SLOPE: {

        title:
            "Kemiringan Lereng",

        shortTitle:
            "Slope",

        text:
            "Kemiringan lereng menunjukkan sensitivitas topografi pesisir. Pantai yang semakin landai memiliki tingkat kerentanan yang semakin tinggi."

    },


    SKOR_ELEV: {

        title:
            "Elevasi Pesisir",

        shortTitle:
            "Elevasi",

        text:
            "Elevasi menunjukkan keterpaparan dataran pesisir terhadap genangan, rob, dan kenaikan muka laut."

    },


    SKOR_GEL: {

        title:
            "Tinggi Gelombang",

        shortTitle:
            "Gelombang",

        text:
            "Tinggi gelombang merepresentasikan tekanan energi hidrodinamika yang bekerja pada garis pantai."

    },


    SKOR_PASUT: {

        title:
            "Pasang Surut",

        shortTitle:
            "Pasut",

        text:
            "Pasang surut menunjukkan pengaruh variasi muka air laut terhadap tingkat keterpaparan pesisir."

    },


    SKOR_SLR: {

        title:
            "Kenaikan Muka Laut",

        shortTitle:
            "SLR",

        text:
            "Sea Level Rise menunjukkan tekanan jangka panjang akibat kenaikan muka laut relatif."

    },


    SKOR_LAHAN: {

        title:
            "Tutupan Lahan",

        shortTitle:
            "Tutupan Lahan",

        text:
            "Tutupan lahan menunjukkan perbedaan sensitivitas antara pantai, tambak, muara, pelabuhan, dan kawasan terbangun."

    },


    CVI_TOTAL: {

        title:
            "Coastal Vulnerability Index",

        shortTitle:
            "CVI Total",

        text:
            "CVI total merupakan hasil integrasi delapan parameter kerentanan pesisir."

    }

};



// =========================================================
// 11. DEFINISI KELAS
// =========================================================

const cviClassDefinitions = {

    SKOR_SHORE: {

        title:
            "Dinamika Garis Pantai",

        classes: {

            1:
                "≥ 2,0 m/tahun — Akresi tinggi",

            2:
                "1,0 – 2,0 m/tahun — Akresi",

            3:
                "−1,0 – 1,0 m/tahun — Stabil",

            4:
                "−1,1 – −2,0 m/tahun — Abrasi",

            5:
                "≤ −2,0 m/tahun — Abrasi tinggi"

        }

    },


    SKOR_GEOM: {

        title:
            "Komposisi Geomorfologi"

    },


    SKOR_SLOPE: {

        title:
            "Kemiringan Lereng",

        classes: {

            1:
                "> 12%",

            2:
                "8 – 12%",

            3:
                "4 – 8%",

            4:
                "2 – 4%",

            5:
                "< 2%"

        }

    },


    SKOR_ELEV: {

        title:
            "Elevasi Pesisir",

        classes: {

            1:
                "> 30,1 m",

            2:
                "20,1 – 30,0 m",

            3:
                "10,1 – 20,0 m",

            4:
                "5,1 – 10,0 m",

            5:
                "0 – 5,0 m"

        }

    },


    SKOR_GEL: {

        title:
            "Tinggi Gelombang Rata-rata",

        classes: {

            1:
                "< 0,245 m",

            2:
                "0,245 – 0,258 m",

            3:
                "0,258 – 0,268 m",

            4:
                "0,268 – 0,275 m",

            5:
                "> 0,275 m"

        }

    },


    SKOR_PASUT: {

        title:
            "Pasang Surut Rata-rata",

        classes: {

            1:
                "> 0,921 m",

            2:
                "0,884 – 0,921 m",

            3:
                "0,873 – 0,884 m",

            4:
                "0,837 – 0,873 m",

            5:
                "< 0,837 m"

        }

    },


    SKOR_SLR: {

        title:
            "Kenaikan Muka Laut Relatif",

        classes: {

            1:
                "< −1,21 mm/tahun",

            2:
                "−1,21 – 0,10 mm/tahun",

            3:
                "0,10 – 1,24 mm/tahun",

            4:
                "1,24 – 1,36 mm/tahun",

            5:
                "> 1,36 mm/tahun"

        }

    },


    SKOR_LAHAN: {

        title:
            "Komposisi Tutupan Lahan"

    },


    CVI_TOTAL: {

        title:
            "Distribusi Coastal Vulnerability Index",

        classes: {

            1:
                "Sangat Rendah",

            2:
                "Rendah",

            3:
                "Sedang",

            4:
                "Tinggi",

            5:
                "Sangat Tinggi"

        }

    }

};



const cviClassColors = {

    1:
        "#1a9850",

    2:
        "#91cf60",

    3:
        "#fee08b",

    4:
        "#fc8d59",

    5:
        "#d73027"

};



// =========================================================
// 12. LOAD CVI
// =========================================================

async function loadCviGeoJSON() {

    const paths = [

        "Data/ANALISIS_CVI.geojson",

        "Data/ANALISIS_DCVI.geojson"

    ];


    for (
        const path
        of paths
    ) {

        try {

            const response =
                await fetch(
                    path
                );


            if (
                !response.ok
            ) {

                continue;

            }


            const data =
                await response.json();


            if (
                data &&
                Array.isArray(
                    data.features
                ) &&
                data.features.length
            ) {

                console.log(
                    "CVI ditemukan:",
                    path
                );


                console.log(
                    "Jumlah feature:",
                    data.features.length
                );


                return data;

            }

        }

        catch(error) {

            console.warn(

                "Gagal membaca",

                path,

                error

            );

        }

    }


    throw new Error(
        "File CVI tidak ditemukan"
    );

}



// =========================================================
// 13. FIELD PARAMETER
// =========================================================

function getCviParameterField(
    parameter
) {

    const lookup = {

        SKOR_SHORE:
            CVI_FIELDS.shoreline,

        SKOR_GEOM:
            CVI_FIELDS.geom,

        SKOR_SLOPE:
            CVI_FIELDS.slope,

        SKOR_ELEV:
            CVI_FIELDS.elev,

        SKOR_GEL:
            CVI_FIELDS.wave,

        SKOR_PASUT:
            CVI_FIELDS.tide,

        SKOR_SLR:
            CVI_FIELDS.slr,

        SKOR_LAHAN:
            CVI_FIELDS.land,

        CVI_TOTAL:
            CVI_FIELDS.cviClass

    };


    return (
        lookup[parameter] ||
        null
    );

}



// =========================================================
// 14. WARNA CVI
// =========================================================

function classColorExpression(
    field
) {

    return [

        "match",

        [
            "to-number",
            ["get", field]
        ],

        1,
        cviClassColors[1],

        2,
        cviClassColors[2],

        3,
        cviClassColors[3],

        4,
        cviClassColors[4],

        5,
        cviClassColors[5],

        "#80898b"

    ];

}



function getCviColorExpression(
    parameter
) {

    const field =
        getCviParameterField(
            parameter
        );


    if (!field) {

        return "#80898b";

    }


    return classColorExpression(
        field
    );

}



// =========================================================
// 15. NORMALISASI GEOMORFOLOGI
// =========================================================

function normalizeGeomLap(
    value
) {

    const text =
        normalizeText(
            value
        );


    if (
        text ===
        "pasir halus"
    ) {

        return "Pasir halus";

    }


    if (
        text ===
        "pasir kasar"
    ) {

        return "Pasir kasar";

    }


    if (
        text ===
        "bebatuan" ||
        text ===
        "batuan"
    ) {

        return "Bebatuan / struktur";

    }


    if (
        text ===
        "tambak"
    ) {

        return "Tambak";

    }


    if (
        text ===
        "aluvial" ||
        text ===
        "estuari"
    ) {

        return "Aluvial / estuari";

    }


    if (!text) {

        return null;

    }


    return String(value)
        .trim()
        .replaceAll(
            "_",
            " "
        );

}



// =========================================================
// 16. NORMALISASI LAHAN
// =========================================================

function normalizeLandUse(
    value
) {

    const text =
        normalizeText(
            value
        );


    if (!text) {

        return null;

    }


    if (
        text.includes(
            "pantai"
        )
    ) {

        return "Pantai";

    }


    if (
        text.includes(
            "tambak"
        )
    ) {

        return "Tambak";

    }


    if (
        text.includes(
            "muara"
        )
    ) {

        return "Muara";

    }


    if (
        text.includes(
            "pelabuhan"
        )
    ) {

        return "Pelabuhan";

    }


    if (
        text.includes(
            "bangunan"
        ) ||
        text.includes(
            "terbangun"
        )
    ) {

        return "Bangunan";

    }


    if (
        text.includes(
            "mangrove"
        )
    ) {

        return "Mangrove";

    }


    return String(value)
        .trim()
        .replaceAll(
            "_",
            " "
        );

}



// =========================================================
// 17. STATISTIK KATEGORI
// =========================================================

function calculateRawCategoryStats(
    field,
    normalizer
) {

    const features =
        cviGeoJSON?.features ||
        [];


    const counts =
        {};


    features.forEach(
        function(feature) {

            const value =
                feature
                    .properties?.[
                        field
                    ];


            const label =
                normalizer(
                    value
                );


            if (!label) {

                return;

            }


            counts[label] =
                (
                    counts[label] ||
                    0
                )
                +
                1;

        }
    );


    return {

        total:
            features.length,

        rows:

            Object
                .entries(counts)
                .map(
                    function(entry) {

                        return {

                            label:
                                entry[0],

                            count:
                                entry[1],

                            percentage:

                                features.length

                                ?

                                entry[1] /
                                features.length *
                                100

                                :

                                0

                        };

                    }
                )

    };

}



// =========================================================
// 18. STATISTIK SKOR
// =========================================================

function calculateScoreStats(
    field
) {

    const features =
        cviGeoJSON?.features ||
        [];


    const counts = {

        1: 0,

        2: 0,

        3: 0,

        4: 0,

        5: 0

    };


    features.forEach(
        function(feature) {

            const score =
                Number(
                    feature
                        .properties?.[
                            field
                        ]
                );


            if (
                !Number.isFinite(
                    score
                ) ||
                score < 1 ||
                score > 5
            ) {

                return;

            }


            counts[
                Math.round(score)
            ]++;

        }
    );


    return {

        total:
            features.length,

        counts:
            counts

    };

}



// =========================================================
// 19. POPUP STATISTIK PARAMETER
// =========================================================

function createCviStatsPopup() {

    const mapBox =
        document.querySelector(
            "#hasil-cvi .cvi-map-box"
        );


    if (!mapBox) {

        return;

    }


    if (
        document.getElementById(
            "cviStatsPopup"
        )
    ) {

        return;

    }


    const popup =
        document.createElement(
            "div"
        );


    popup.id =
        "cviStatsPopup";


    popup.innerHTML = `

        <div class="cvi-stats-head">

            <div>

                <span>
                    RINGKASAN PARAMETER
                </span>

                <h4 id="cviStatsTitle">
                    Parameter
                </h4>

            </div>


            <button
                id="cviStatsClose"
                type="button">

                ×

            </button>

        </div>


        <div class="cvi-stats-total">

            <span>
                CAKUPAN
            </span>

            <strong id="cviStatsTotal">
                -
            </strong>

        </div>


        <div id="cviStatsRows">
        </div>

    `;


    mapBox.appendChild(
        popup
    );


    if (
        !document.getElementById(
            "cviDynamicStyle"
        )
    ) {

        const style =
            document.createElement(
                "style"
            );


        style.id =
            "cviDynamicStyle";


        style.textContent = `

            #hasil-cvi .cvi-map-box {

                position:
                    relative;

            }


            #cviStatsPopup {

                position:
                    absolute;

                top:
                    18px;

                left:
                    18px;

                z-index:
                    50;

                width:
                    350px;

                max-height:
                    calc(100% - 36px);

                overflow-y:
                    auto;

                display:
                    none;

                padding:
                    18px;

                background:
                    rgba(255,255,255,.97);

                border-top:
                    3px solid #177f7b;

                box-shadow:
                    0 12px 30px rgba(18,55,70,.18);

            }


            #cviStatsPopup.show {

                display:
                    block;

            }


            .cvi-stats-head {

                display:
                    flex;

                justify-content:
                    space-between;

                align-items:
                    flex-start;

                gap:
                    12px;

                padding-bottom:
                    12px;

                border-bottom:
                    1px solid #d8dfdd;

            }


            .cvi-stats-head span {

                display:
                    block;

                margin-bottom:
                    5px;

                font-size:
                    8px;

                font-weight:
                    700;

                letter-spacing:
                    2px;

                color:
                    #177f7b;

            }


            .cvi-stats-head h4 {

                margin:
                    0;

                font-family:
                    Georgia,serif;

                font-size:
                    23px;

                font-weight:
                    500;

                color:
                    #123746;

            }


            #cviStatsClose {

                border:
                    0;

                background:
                    transparent;

                padding:
                    0;

                font-size:
                    26px;

                color:
                    #667b82;

                cursor:
                    pointer;

            }


            .cvi-stats-total {

                display:
                    flex;

                justify-content:
                    space-between;

                align-items:
                    flex-end;

                padding:
                    12px 0;

                border-bottom:
                    1px solid #dfe5e3;

            }


            .cvi-stats-total span {

                font-size:
                    9px;

                letter-spacing:
                    1.5px;

                color:
                    #718187;

            }


            .cvi-stats-total strong {

                font-family:
                    Georgia,serif;

                font-size:
                    27px;

                font-weight:
                    500;

                color:
                    #123746;

            }


            .cvi-stat-row {

                padding:
                    10px 0;

                border-bottom:
                    1px solid #edf0ef;

            }


            .cvi-stat-top {

                display:
                    flex;

                justify-content:
                    space-between;

                align-items:
                    flex-start;

                gap:
                    12px;

                margin-bottom:
                    6px;

            }


            .cvi-stat-label {

                display:
                    flex;

                gap:
                    8px;

                align-items:
                    flex-start;

                max-width:
                    220px;

                font-size:
                    12px;

                line-height:
                    1.4;

                color:
                    #354f58;

            }


            .cvi-stat-dot {

                flex:
                    none;

                width:
                    10px;

                height:
                    10px;

                margin-top:
                    3px;

            }


            .cvi-stat-number {

                white-space:
                    nowrap;

                font-size:
                    11px;

                font-weight:
                    700;

                color:
                    #123746;

            }


            .cvi-stat-bar {

                height:
                    5px;

                background:
                    #e7ecea;

            }


            .cvi-stat-fill {

                height:
                    100%;

            }



            /* =============================================
               POPUP PARAMETER PER GARIS
            ============================================= */

            .cvi-param-popup {

                width:
                    290px;

            }


            .cvi-param-popup .cvi-param-title {

                margin-top:
                    12px;

                padding-top:
                    11px;

                border-top:
                    1px solid #dce3e1;

                font-size:
                    8px;

                font-weight:
                    700;

                letter-spacing:
                    1.5px;

                color:
                    #177f7b;

            }


            .cvi-param-popup .cvi-param-discussion {

                margin-top:
                    6px;

                font-size:
                    11px;

                line-height:
                    1.6;

                color:
                    #405961;

            }



            /* =============================================
               PANEL CVI TOTAL
            ============================================= */

            #cviDetailPanel {

                position:
                    absolute;

                top:
                    14px;

                right:
                    14px;

                bottom:
                    14px;

                z-index:
                    70;

                width:
                    390px;

                max-width:
                    calc(100% - 28px);

                display:
                    none;

                flex-direction:
                    column;

                background:
                    rgba(250,251,249,.99);

                box-shadow:
                    0 15px 38px rgba(18,55,70,.24);

                overflow:
                    hidden;

            }


            #cviDetailPanel.show {

                display:
                    flex;

            }


            .cvi-detail-header {

                flex:
                    none;

                display:
                    flex;

                justify-content:
                    space-between;

                align-items:
                    flex-start;

                gap:
                    12px;

                padding:
                    17px 19px;

                background:
                    #123746;

                color:
                    white;

            }


            .cvi-detail-header span {

                display:
                    block;

                margin-bottom:
                    4px;

                font-size:
                    8px;

                letter-spacing:
                    2px;

                font-weight:
                    700;

                color:
                    #9fd1ca;

            }


            .cvi-detail-header h3 {

                margin:
                    0;

                font-family:
                    Georgia,serif;

                font-size:
                    27px;

                font-weight:
                    500;

            }


            #cviDetailClose {

                border:
                    0;

                padding:
                    0;

                background:
                    transparent;

                color:
                    white;

                font-size:
                    26px;

                cursor:
                    pointer;

            }


            .cvi-detail-body {

                flex:
                    1;

                min-height:
                    0;

                overflow-y:
                    auto;

                overscroll-behavior:
                    contain;

                padding:
                    18px 20px 30px;

            }


            .cvi-detail-body::-webkit-scrollbar {

                width:
                    6px;

            }


            .cvi-detail-body::-webkit-scrollbar-thumb {

                background:
                    #a9b9b5;

                border-radius:
                    6px;

            }


            .cvi-detail-status {

                display:
                    flex;

                justify-content:
                    space-between;

                align-items:
                    center;

                padding:
                    10px 12px;

                margin-bottom:
                    15px;

                background:
                    #e9f3ef;

                border-left:
                    3px solid #177f7b;

            }


            .cvi-detail-status.buatan {

                background:
                    #f4e7df;

                border-left-color:
                    #a75e3d;

            }


            .cvi-detail-status span {

                font-size:
                    8px;

                letter-spacing:
                    1.5px;

                font-weight:
                    700;

                color:
                    #718187;

            }


            .cvi-detail-status strong {

                font-size:
                    12px;

                letter-spacing:
                    1px;

                color:
                    #123746;

            }


            .cvi-detail-table {

                border-top:
                    1px solid #dce3e1;

            }


            .cvi-detail-row {

                display:
                    grid;

                grid-template-columns:
                    1fr 1.25fr;

                gap:
                    15px;

                padding:
                    9px 0;

                border-bottom:
                    1px solid #e2e7e5;

                font-size:
                    11px;

            }


            .cvi-detail-row span {

                color:
                    #75858a;

            }


            .cvi-detail-row strong {

                text-align:
                    right;

                color:
                    #123746;

            }


            .cvi-section {

                margin-top:
                    22px;

            }


            .cvi-section-tag {

                display:
                    block;

                margin-bottom:
                    5px;

                font-size:
                    8px;

                letter-spacing:
                    1.6px;

                font-weight:
                    700;

                color:
                    #177f7b;

            }


            .cvi-section h4 {

                margin:
                    0 0 9px;

                font-family:
                    Georgia,serif;

                font-weight:
                    500;

                font-size:
                    18px;

                color:
                    #123746;

            }


            .cvi-section p {

                margin:
                    0;

                font-size:
                    11px;

                line-height:
                    1.65;

                color:
                    #405961;

            }


            .cvi-history {

                margin-top:
                    13px;

            }


            .cvi-history-row {

                display:
                    grid;

                grid-template-columns:
                    52px 1fr 75px;

                gap:
                    8px;

                align-items:
                    center;

                padding:
                    7px 0;

                border-bottom:
                    1px solid #edf0ef;

                font-size:
                    10px;

            }


            .cvi-history-year {

                font-weight:
                    700;

                color:
                    #123746;

            }


            .cvi-history-land {

                color:
                    #50666e;

            }


            .cvi-history-type {

                text-align:
                    right;

                font-size:
                    9px;

                font-weight:
                    700;

                letter-spacing:
                    .7px;

            }


            .cvi-history-type.natural {

                color:
                    #177f7b;

            }


            .cvi-history-type.buatan {

                color:
                    #a75e3d;

            }


            .cvi-score-pills {

                display:
                    flex;

                flex-wrap:
                    wrap;

                gap:
                    6px;

                margin-top:
                    12px;

            }


            .cvi-score-pill {

                padding:
                    5px 8px;

                font-size:
                    9px;

                background:
                    #edf1ef;

                color:
                    #405961;

            }


            @media(
                max-width:800px
            ) {

                #cviStatsPopup {

                    left:
                        10px;

                    right:
                        10px;

                    width:
                        auto;

                }


                #cviDetailPanel {

                    left:
                        10px;

                    right:
                        10px;

                    top:
                        10px;

                    bottom:
                        10px;

                    width:
                        auto;

                    max-width:
                        none;

                }

            }

        `;


        document.head.appendChild(
            style
        );

    }


    document
        .getElementById(
            "cviStatsClose"
        )
        .addEventListener(
            "click",
            function() {

                popup
                    .classList
                    .remove("show");

            }
        );

}



// =========================================================
// 20. RINGKASAN HASIL PARAMETER
// SESUAI NARASI HASIL DRAFT TESIS
// =========================================================

function showCviStatistics(
    parameter
) {

    createCviStatsPopup();


    const popup =
        document.getElementById(
            "cviStatsPopup"
        );


    const title =
        document.getElementById(
            "cviStatsTitle"
        );


    const total =
        document.getElementById(
            "cviStatsTotal"
        );


    const rows =
        document.getElementById(
            "cviStatsRows"
        );


    if (
        !popup ||
        !title ||
        !total ||
        !rows
    ) {

        return;

    }



    // =====================================================
    // HELPER — BLOK ANGKA HASIL
    // =====================================================

    function metricRow(
        label,
        value,
        note = ""
    ) {

        return `

            <div
                style="
                    padding:12px 0;
                    border-bottom:1px solid #e1e7e5;
                "
            >

                <div
                    style="
                        margin-bottom:4px;
                        font-size:8px;
                        font-weight:700;
                        letter-spacing:1.4px;
                        color:#789096;
                    "
                >
                    ${label}
                </div>


                <div
                    style="
                        font-family:Georgia,serif;
                        font-size:24px;
                        line-height:1.15;
                        color:#123746;
                    "
                >
                    ${value}
                </div>


                ${
                    note

                    ?

                    `
                    <div
                        style="
                            margin-top:5px;
                            font-size:10px;
                            line-height:1.5;
                            color:#5d7178;
                        "
                    >
                        ${note}
                    </div>
                    `

                    :

                    ""
                }

            </div>

        `;

    }



    // =====================================================
    // HELPER — TEMUAN UTAMA
    // =====================================================

    function discussionBox(
        text
    ) {

        return `

            <div
                style="
                    margin-top:14px;
                    padding-top:13px;
                    border-top:2px solid #177f7b;
                "
            >

                <div
                    style="
                        margin-bottom:6px;
                        font-size:8px;
                        font-weight:700;
                        letter-spacing:1.5px;
                        color:#177f7b;
                    "
                >
                    TEMUAN UTAMA
                </div>


                <div
                    style="
                        font-size:11px;
                        line-height:1.65;
                        color:#405961;
                    "
                >
                    ${text}
                </div>

            </div>

        `;

    }



    // =====================================================
    // 1. DINAMIKA GARIS PANTAI
    // =====================================================

    if (
        parameter ===
        "SKOR_SHORE"
    ) {

        title.textContent =
            "Dinamika Garis Pantai";


        total.textContent =
            "46 transek";


        rows.innerHTML =

            metricRow(
                "TRANSEK ABRASI",
                "69,57%",
                "32 dari 46 transek memiliki LRR negatif."
            )

            +

            metricRow(
                "TRANSEK AKRESI",
                "30,43%",
                "14 dari 46 transek menunjukkan kecenderungan akresi."
            )

            +

            metricRow(
                "RATA-RATA LRR",
                "−0,96 m/tahun",
                "Menunjukkan kecenderungan abrasi bersih selama 1988–2025."
            )

            +

            metricRow(
                "ABRASI MAKSIMUM",
                "−4,93 m/tahun",
                "Laju kemunduran garis pantai paling negatif pada seluruh transek."
            )

            +

            discussionBox(
                "Dinamika garis pantai Kota Tegal didominasi abrasi, tetapi pola spasialnya heterogen. Segmen abrasi kuat tersebar pada beberapa klaster, sedangkan segmen stabil hingga akresi terkonsentrasi terutama di sekitar kawasan pelabuhan dan struktur pemecah gelombang."
            );


        popup
            .classList
            .add("show");


        return;

    }



    // =====================================================
    // 2. GEOMORFOLOGI
    // =====================================================

    if (
        parameter ===
        "SKOR_GEOM"
    ) {

        title.textContent =
            "Geomorfologi Pantai";


        total.textContent =
            "46 transek";


        rows.innerHTML =

            metricRow(
                "TIPE DOMINAN",
                "Pasir halus · 37%",
                "17 transek."
            )

            +

            metricRow(
                "PASIR KASAR",
                "24%",
                "11 transek."
            )

            +

            metricRow(
                "BEBATUAN / STRUKTUR",
                "17%",
                "8 transek."
            )

            +

            metricRow(
                "TAMBAK",
                "13%",
                "6 transek."
            )

            +

            metricRow(
                "ALUVIAL / ESTUARI",
                "9%",
                "4 transek."
            )

            +

            discussionBox(
                "Tambak dan dataran aluvial/estuari menjadi tipe geomorfologi yang relatif lebih rentan karena materialnya lebih lunak dan mudah berubah. Sebaliknya, bebatuan dan struktur keras memberi resistensi lokal yang lebih tinggi terhadap erosi."
            );


        popup
            .classList
            .add("show");


        return;

    }



    // =====================================================
    // 3. KEMIRINGAN LERENG
    // =====================================================

    if (
        parameter ===
        "SKOR_SLOPE"
    ) {

        title.textContent =
            "Kemiringan Lereng";


        total.textContent =
            "46 transek";


        rows.innerHTML =

            metricRow(
                "RENTANG SLOPE",
                "0,0002% – 14,18%"
            )

            +

            metricRow(
                "RATA-RATA",
                "5,14%"
            )

            +

            metricRow(
                "SANGAT RENTAN",
                "28%",
                "13 transek memiliki slope < 2%."
            )

            +

            metricRow(
                "SANGAT RENDAH",
                "9%",
                "4 transek memiliki slope > 12%."
            )

            +

            discussionBox(
                "Slope sangat landai terutama dijumpai pada segmen tambak dan muara di bagian barat–tengah pesisir. Lereng landai memperbesar jangkauan genangan pasang dan limpasan gelombang ke arah daratan."
            );


        popup
            .classList
            .add("show");


        return;

    }



    // =====================================================
    // 4. ELEVASI
    // =====================================================

    if (
        parameter ===
        "SKOR_ELEV"
    ) {

        title.textContent =
            "Elevasi Pesisir";


        total.textContent =
            "46 transek";


        rows.innerHTML =

            metricRow(
                "RENTANG ELEVASI",
                "−2,94 – −0,50 m"
            )

            +

            metricRow(
                "RATA-RATA",
                "−2,23 m"
            )

            +

            metricRow(
                "KERENTANAN",
                "100% sangat tinggi",
                "Seluruh 46 transek berada pada kelas elevasi paling rentan."
            )

            +

            discussionBox(
                "Elevasi tidak memberikan diferensiasi kelas antartransek karena seluruh pesisir Kota Tegal berada pada dataran yang sangat rendah. Kondisi ini memperbesar keterpaparan terhadap rob, limpasan gelombang, genangan, dan kenaikan muka laut."
            );


        popup
            .classList
            .add("show");


        return;

    }



    // =====================================================
    // 5. TINGGI GELOMBANG
    // =====================================================

    if (
        parameter ===
        "SKOR_GEL"
    ) {

        title.textContent =
            "Tinggi Gelombang";


        total.textContent =
            "1988–2025";


        rows.innerHTML =

            metricRow(
                "RENTANG Hs TAHUNAN",
                "0,20 – 0,32 m",
                "Minimum 0,20 m pada 1989 dan 1998; maksimum 0,32 m pada 2015."
            )

            +

            metricRow(
                "RATA-RATA",
                "± 0,26 m",
                "Menunjukkan rezim gelombang berenergi relatif rendah di pesisir Tegal."
            )

            +

            metricRow(
                "KONDISI 2025",
                "0,253 m",
                "Masuk kelas kedua dengan skor kerentanan 2 atau rendah."
            )

            +

            discussionBox(
                "Skor gelombang berfluktuasi dari tahun ke tahun tanpa tren jangka panjang yang konsisten. Variasi ini lebih mencerminkan perubahan kondisi musiman dan antartahun, sedangkan tekanan hidrodinamika jangka panjang Kota Tegal lebih kuat dipengaruhi elevasi rendah dan kenaikan muka laut."
            );


        popup
            .classList
            .add("show");


        return;

    }



    // =====================================================
    // 6. PASANG SURUT
    // =====================================================

    if (
        parameter ===
        "SKOR_PASUT"
    ) {

        title.textContent =
            "Pasang Surut";


        total.textContent =
            "1988–2025";


        rows.innerHTML =

            metricRow(
                "RENTANG TAHUNAN",
                "0,809 – 0,944 m"
            )

            +

            metricRow(
                "RATA-RATA",
                "0,876 m",
                "Menggambarkan kondisi pasang surut menengah pada periode penelitian."
            )

            +

            metricRow(
                "DISTRIBUSI SKOR",
                "18–22% per kelas",
                "Kelima kelas relatif merata dan tidak menunjukkan dominasi satu kelas."
            )

            +

            metricRow(
                "KONDISI 2025",
                "0,888 m",
                "Masuk kelas kedua dengan skor kerentanan 2."
            )

            +

            discussionBox(
                "Fluktuasi pasang surut antartahun bersifat alami dan tidak membentuk tren searah. Dalam skema CVI penelitian ini, nilai pasang surut yang lebih kecil memperoleh skor kerentanan lebih tinggi."
            );


        popup
            .classList
            .add("show");


        return;

    }



    // =====================================================
    // 7. KENAIKAN MUKA LAUT / SLR
    // =====================================================

    if (
        parameter ===
        "SKOR_SLR"
    ) {

        title.textContent =
            "Kenaikan Muka Laut";


        total.textContent =
            "46 transek";


        rows.innerHTML =

            metricRow(
                "LAJU REGIONAL",
                "4,69 mm/tahun"
            )

            +

            metricRow(
                "SKOR CVI",
                "5 · Sangat Tinggi",
                "Nilai 4,69 mm/tahun melampaui ambang kelas tertinggi (> 1,36 mm/tahun)."
            )

            +

            metricRow(
                "CAKUPAN",
                "100%",
                "Seluruh transek dan tahun memperoleh skor kerentanan SLR maksimum."
            )

            +

            discussionBox(
                "Kenaikan muka laut merupakan salah satu parameter yang secara konsisten memberi tekanan maksimum terhadap seluruh pesisir Kota Tegal. Dampaknya menjadi lebih penting karena terjadi pada dataran dengan elevasi yang sangat rendah."
            );


        popup
            .classList
            .add("show");


        return;

    }



    // =====================================================
    // 8. TUTUPAN LAHAN
    // =====================================================

    if (
        parameter ===
        "SKOR_LAHAN"
    ) {

        title.textContent =
            "Tutupan Lahan";


        total.textContent =
            "46 transek";


        rows.innerHTML =

            metricRow(
                "PANTAI TERBUKA",
                "39%",
                "18 transek."
            )

            +

            metricRow(
                "BANGUNAN / TERBANGUN",
                "30%",
                "14 transek."
            )

            +

            metricRow(
                "TAMBAK",
                "13%",
                "6 transek."
            )

            +

            metricRow(
                "MUARA",
                "13%",
                "6 transek."
            )

            +

            metricRow(
                "PELABUHAN",
                "4%",
                "2 transek."
            )

            +

            metricRow(
                "TIPE BUATAN",
                "63%",
                "Menunjukkan tingkat modifikasi manusia yang tinggi pada pesisir Kota Tegal."
            )

            +

            discussionBox(
                "Bangunan dan pelabuhan memiliki skor kerentanan lahan tertinggi karena merepresentasikan modifikasi manusia dan keterpaparan aset yang besar. Tambak dan muara berada pada tingkat sedang–tinggi, sedangkan pantai terbuka relatif lebih rendah."
            );


        popup
            .classList
            .add("show");


        return;

    }



    // =====================================================
    // 9. CVI TOTAL
    // =====================================================

    if (
        parameter ===
        "CVI_TOTAL"
    ) {

        title.textContent =
            "Coastal Vulnerability Index";


        total.textContent =
            "1.746 data";


        rows.innerHTML =

            metricRow(
                "RENTANG CVI",
                "5,0 – 176,8",
                "Hasil keseluruhan periode 1988–2025."
            )

            +

            metricRow(
                "RATA-RATA CVI",
                "49,3"
            )

            +

            metricRow(
                "DISTRIBUSI KELAS",
                "17–23% per kelas",
                "Kelima kategori relatif merata tanpa satu kelas yang mendominasi."
            )

            +

            metricRow(
                "RENTANG 2025",
                "10,0 – 70,7"
            )

            +

            metricRow(
                "DOMINAN 2025",
                "14 transek · Sedang",
                "Sangat rendah 13 transek, rendah 13 transek, dan tidak ada transek sangat tinggi."
            )

            +

            discussionBox(
                "Pola CVI menunjukkan bahwa kerentanan tinggi terbentuk dari kombinasi beberapa faktor, terutama geomorfologi lunak, topografi landai, elevasi rendah, abrasi aktif, dan tekanan pemanfaatan lahan. Karena menggunakan geometric mean, satu parameter berisiko tinggi tidak selalu membuat CVI total menjadi tinggi apabila parameter lain relatif rendah."
            );


        popup
            .classList
            .add("show");


        return;

    }

}



// =========================================================
// 21. DATA POPUP PARAMETER
// =========================================================

function getCviLinePopupData(
    props,
    parameter
) {

    if (
        parameter ===
        "SKOR_GEOM"
    ) {

        return {

            parameter:
                "Geomorfologi",

            score:
                props[
                    CVI_FIELDS.geom
                ],

            rawLabel:
                normalizeGeomLap(
                    props[
                        CVI_FIELDS.geomRaw
                    ]
                )

        };

    }


    if (
        parameter ===
        "SKOR_LAHAN"
    ) {

        return {

            parameter:
                "Tutupan Lahan",

            score:
                props[
                    CVI_FIELDS.land
                ],

            rawLabel:
                normalizeLandUse(
                    props[
                        CVI_FIELDS.landRaw
                    ]
                )

        };

    }


    const field =
        getCviParameterField(
            parameter
        );


    return {

        parameter:
            cviParameterInfo[
                parameter
            ]?.shortTitle ??
            parameter,

        score:
            field
            ?
            props[field]
            :
            "-",

        rawLabel:
            null

    };

}



// =========================================================
// 22. LABEL KERENTANAN
// =========================================================

function getVulnerabilityLabel(
    score
) {

    const labels = {

        1:
            "Sangat Rendah",

        2:
            "Rendah",

        3:
            "Sedang",

        4:
            "Tinggi",

        5:
            "Sangat Tinggi"

    };


    return (
        labels[
            Number(score)
        ]
        ??
        "-"
    );

}



function getParameterClassLabel(
    parameter,
    score
) {

    if (
        parameter ===
        "SKOR_GEOM" ||
        parameter ===
        "SKOR_LAHAN"
    ) {

        return getVulnerabilityLabel(
            score
        );

    }


    return (

        cviClassDefinitions[
            parameter
        ]?.classes?.[
            Number(score)
        ]

        ??

        "-"

    );

}



// =========================================================
// 23. PEMBAHASAN KHUSUS PARAMETER
// =========================================================

function getParameterDiscussion(
    parameter,
    score,
    props
) {

    const s =
        Number(
            score
        );


    // =====================================================
    // SHORELINE
    // =====================================================

    if (
        parameter ===
        "SKOR_SHORE"
    ) {

        if (
            s >= 4
        ) {

            return "Segmen ini menunjukkan kecenderungan abrasi. Mundurnya posisi garis pantai meningkatkan kerentanan karena material pantai mengalami kehilangan atau redistribusi secara lebih dominan.";

        }


        if (
            s === 3
        ) {

            return "Dinamika garis pantai pada segmen ini relatif stabil, sehingga kontribusi parameter shoreline terhadap kerentanan berada pada tingkat sedang.";

        }


        return "Segmen menunjukkan kecenderungan akresi. Kondisi ini memberikan tingkat kerentanan shoreline yang relatif lebih rendah.";

    }



    // =====================================================
    // GEOMORFOLOGI
    // =====================================================

    if (
        parameter ===
        "SKOR_GEOM"
    ) {

        const geom =
            normalizeGeomLap(
                props[
                    CVI_FIELDS.geomRaw
                ]
            );


        if (
            geom ===
            "Tambak"
        ) {

            return "Geomorfologi berupa tambak memiliki material relatif lunak dan perlindungan alami yang terbatas sehingga lebih sensitif terhadap erosi dan perubahan garis pantai.";

        }


        if (
            geom ===
            "Aluvial / estuari"
        ) {

            return "Material aluvial atau estuari relatif belum terkonsolidasi sehingga lebih mudah mengalami erosi dan perubahan morfologi.";

        }


        if (
            geom ===
            "Pasir halus"
        ) {

            return "Pantai pasir halus relatif mudah mengalami redistribusi material oleh gelombang dan arus sehingga memiliki kerentanan sedang.";

        }


        if (
            geom ===
            "Pasir kasar"
        ) {

            return "Pantai pasir kasar memiliki material yang relatif lebih resisten terhadap mobilisasi dibandingkan pasir halus.";

        }


        if (
            geom ===
            "Bebatuan / struktur"
        ) {

            return "Bebatuan atau struktur keras memberikan resistensi lokal yang lebih tinggi terhadap erosi, sehingga skor geomorfologinya relatif rendah.";

        }


        return "Kerentanan geomorfologi ditentukan oleh resistensi material dan bentuklahan pesisir terhadap proses erosi.";

    }



    // =====================================================
    // SLOPE
    // =====================================================

    if (
        parameter ===
        "SKOR_SLOPE"
    ) {

        if (
            s >= 4
        ) {

            return "Kemiringan pantai yang landai meningkatkan keterpaparan horizontal terhadap genangan dan memungkinkan perubahan muka air memengaruhi area daratan yang lebih luas.";

        }


        return "Kemiringan yang relatif lebih besar menurunkan keterpaparan horizontal terhadap genangan dibandingkan pantai yang sangat landai.";

    }



    // =====================================================
    // ELEVASI
    // =====================================================

    if (
        parameter ===
        "SKOR_ELEV"
    ) {

        if (
            s >= 4
        ) {

            return "Elevasi pesisir yang rendah meningkatkan keterpaparan terhadap genangan, rob, kenaikan muka laut, serta pergeseran garis pantai ke arah darat.";

        }


        if (
            s === 3
        ) {

            return "Elevasi berada pada tingkat menengah sehingga kontribusinya terhadap kerentanan pesisir juga berada pada tingkat sedang.";

        }


        return "Elevasi yang relatif tinggi mengurangi keterpaparan langsung terhadap genangan dan kenaikan muka laut.";

    }



    // =====================================================
    // GELOMBANG
    // =====================================================

    if (
        parameter ===
        "SKOR_GEL"
    ) {

        if (
            s >= 4
        ) {

            return "Tinggi gelombang yang relatif besar meningkatkan energi yang bekerja pada pantai dan potensi redistribusi sedimen.";

        }


        return "Energi gelombang pada kelas ini relatif lebih rendah sehingga tekanan langsung terhadap garis pantai juga lebih rendah.";

    }



    // =====================================================
    // PASUT
    // =====================================================

    if (
        parameter ===
        "SKOR_PASUT"
    ) {

        if (
            s >= 4
        ) {

            return "Karakter pasang surut pada kelas ini meningkatkan keterpaparan zona pesisir terhadap perubahan muka air dan genangan.";

        }


        return "Kontribusi pasang surut terhadap kerentanan relatif lebih rendah pada kelas ini.";

    }



    // =====================================================
    // SLR
    // =====================================================

    if (
        parameter ===
        "SKOR_SLR"
    ) {

        if (
            s >= 4
        ) {

            return "Kenaikan muka laut relatif memberikan tekanan jangka panjang terhadap pantai, terutama pada segmen dengan elevasi rendah dan lereng landai.";

        }


        return "Tekanan kenaikan muka laut relatif pada kelas ini lebih rendah dibandingkan segmen dengan skor SLR tinggi.";

    }



    // =====================================================
    // TUTUPAN LAHAN
    // =====================================================

    if (
        parameter ===
        "SKOR_LAHAN"
    ) {

        const land =
            normalizeLandUse(
                props[
                    CVI_FIELDS.landRaw
                ]
            );


        if (
            land ===
            "Tambak"
        ) {

            return "Kawasan tambak relatif sensitif karena berada pada dataran rendah dan umumnya memiliki perlindungan vegetasi alami yang terbatas.";

        }


        if (
            land ===
            "Muara"
        ) {

            return "Kawasan muara bersifat dinamis akibat interaksi suplai sedimen sungai, arus, gelombang, dan perubahan posisi mulut sungai.";

        }


        if (
            land ===
            "Pelabuhan"
        ) {

            return "Kawasan pelabuhan memiliki struktur keras yang dapat memberikan perlindungan lokal tetapi juga mengubah pola distribusi sedimen di sepanjang pantai.";

        }


        if (
            land ===
            "Bangunan"
        ) {

            return "Kawasan terbangun memiliki keterpaparan aset yang tinggi. Struktur keras dapat menahan perubahan secara lokal tetapi mengurangi kemampuan pantai melakukan penyesuaian alami.";

        }


        if (
            land ===
            "Mangrove"
        ) {

            return "Mangrove memberikan perlindungan alami melalui vegetasi dan kemampuan meredam energi gelombang sehingga kerentanan relatif lebih rendah.";

        }


        return "Sensitivitas tutupan lahan dipengaruhi oleh karakter pemanfaatan lahan dan kemampuan kawasan dalam merespons proses pesisir.";

    }


    return "";

}



// =========================================================
// 24. RIWAYAT SEGMENT NATURAL / BUATAN
// =========================================================

function getFeatureTransectName(
    props
) {

    return (

        props.NAMA_TITIK ??

        props.Nama_Titik ??

        props.NAMA_TITI2 ??

        props.Nama_tit_1 ??

        props.TRANSECTID ??

        "-"

    );

}



function getFeatureYear(
    props
) {

    const year =
        Number(

            props.TAHUN ??

            props.Tahun

        );


    return (

        Number.isFinite(
            year
        )

        ?

        year

        :

        null

    );

}



function getSegmentHistory(
    nama
) {

    return (
        cviGeoJSON?.features ||
        []
    )

        .filter(
            function(feature) {

                return (

                    String(
                        getFeatureTransectName(
                            feature.properties ||
                            {}
                        )
                    )

                    ===

                    String(
                        nama
                    )

                );

            }
        )

        .sort(
            function(a, b) {

                return (

                    (
                        getFeatureYear(
                            a.properties ||
                            {}
                        )
                        ||
                        0
                    )

                    -

                    (
                        getFeatureYear(
                            b.properties ||
                            {}
                        )
                        ||
                        0
                    )

                );

            }
        );

}



// =========================================================
// TAHUN PERTAMA PERNAH BUATAN
// =========================================================

function getFirstArtificialYear(
    nama
) {

    const history =
        getSegmentHistory(
            nama
        );


    const row =
        history.find(
            function(feature) {

                return (

                    normalizeText(
                        feature
                            .properties?.[
                                CVI_FIELDS.landType
                            ]
                    )

                    ===

                    "buatan"

                );

            }
        );


    return (

        row

        ?

        getFeatureYear(
            row.properties ||
            {}
        )

        :

        null

    );

}



// =========================================================
// TAHUN AWAL BUATAN YANG BERLANJUT
// SAMPAI PERIODE TERAKHIR
// =========================================================

function getSustainedArtificialYear(
    nama
) {

    const history =
        getSegmentHistory(
            nama
        );


    if (
        !history.length
    ) {

        return null;

    }


    for (
        let i = 0;
        i < history.length;
        i++
    ) {

        const type =
            normalizeText(
                history[i]
                    .properties?.[
                        CVI_FIELDS.landType
                    ]
            );


        if (
            type !==
            "buatan"
        ) {

            continue;

        }


        let sustained =
            true;


        for (
            let j = i;
            j < history.length;
            j++
        ) {

            const nextType =
                normalizeText(
                    history[j]
                        .properties?.[
                            CVI_FIELDS.landType
                        ]
                );


            if (
                nextType !==
                "buatan"
            ) {

                sustained =
                    false;

                break;

            }

        }


        if (
            sustained
        ) {

            return getFeatureYear(
                history[i]
                    .properties ||
                {}
            );

        }

    }


    return null;

}



// =========================================================
// 25. RANGKUMAN RIWAYAT LAHAN
// =========================================================

function getLandHistorySummary(
    nama
) {

    const history =
        getSegmentHistory(
            nama
        );


    if (
        !history.length
    ) {

        return {

            history:
                [],

            firstArtificial:
                null,

            sustainedArtificial:
                null,

            text:
                "Riwayat perubahan penggunaan lahan tidak tersedia."

        };

    }


    const firstArtificial =
        getFirstArtificialYear(
            nama
        );


    const sustainedArtificial =
        getSustainedArtificialYear(
            nama
        );


    const latest =
        history[
            history.length -
            1
        ];


    const latestType =
        normalizeText(
            latest
                .properties?.[
                    CVI_FIELDS.landType
                ]
        );


    let text =
        "";


    if (
        !firstArtificial
    ) {

        text =
            `Sepanjang periode data yang tersedia, segmen ${nama} tetap teridentifikasi sebagai Natural.`;

    }


    else if (
        firstArtificial &&
        sustainedArtificial &&
        firstArtificial ===
        sustainedArtificial
    ) {

        text =
            `Segmen ${nama} pertama kali teridentifikasi sebagai Buatan pada tahun ${firstArtificial} dan klasifikasi tersebut kemudian bertahan hingga periode terakhir pengamatan.`;

    }


    else if (
        firstArtificial &&
        sustainedArtificial
    ) {

        text =
            `Segmen ${nama} pertama kali teridentifikasi sebagai Buatan pada tahun ${firstArtificial}. Perubahan awal tersebut belum terus bertahan; fase Buatan yang berlangsung secara berkelanjutan teridentifikasi sejak tahun ${sustainedArtificial}.`;

    }


    else if (
        firstArtificial &&
        latestType ===
        "natural"
    ) {

        text =
            `Segmen ${nama} pernah teridentifikasi sebagai Buatan mulai tahun ${firstArtificial}, tetapi pada periode berikutnya kembali diklasifikasikan sebagai Natural.`;

    }


    else {

        text =
            `Segmen ${nama} pertama kali teridentifikasi sebagai Buatan pada tahun ${firstArtificial}. Riwayat klasifikasinya menunjukkan perubahan Natural–Buatan yang tidak sepenuhnya kontinu.`;

    }


    return {

        history:
            history,

        firstArtificial:
            firstArtificial,

        sustainedArtificial:
            sustainedArtificial,

        text:
            text

    };

}



// =========================================================
// 26. PEMBAHASAN CVI TOTAL
// =========================================================

function getCviTotalDiscussion(
    props,
    nama
) {

    const factors =
        [];


    if (
        Number(
            props.SKOR_SHORE
        ) >= 4
    ) {

        factors.push(
            "dinamika garis pantai menunjukkan kecenderungan abrasi"
        );

    }


    if (
        Number(
            props.SKOR_GEOM
        ) >= 4
    ) {

        factors.push(
            "geomorfologi memiliki tingkat kerentanan tinggi"
        );

    }


    if (
        Number(
            props.SKOR_SLOPE
        ) >= 4
    ) {

        factors.push(
            "lereng pantai relatif landai"
        );

    }


    if (
        Number(
            props.SKOR_ELEV
        ) >= 4
    ) {

        factors.push(
            "elevasi pesisir relatif rendah"
        );

    }


    if (
        Number(
            props.SKOR_GEL
        ) >= 4
    ) {

        factors.push(
            "tekanan gelombang berada pada kelas tinggi"
        );

    }


    if (
        Number(
            props.SKOR_PASUT
        ) >= 4
    ) {

        factors.push(
            "komponen pasang surut meningkatkan keterpaparan"
        );

    }


    if (
        Number(
            props.SKOR_SLR
        ) >= 4
    ) {

        factors.push(
            "kenaikan muka laut relatif memberikan tekanan tambahan"
        );

    }


    if (
        Number(
            props.SKOR_LAHAN
        ) >= 4
    ) {

        factors.push(
            "tutupan lahan berada pada kelas kerentanan tinggi"
        );

    }


    const land =
        normalizeLandUse(
            props.LAHAN
        );


    let landText =
        "Karakter penggunaan lahan turut memengaruhi kemampuan segmen pantai dalam merespons perubahan fisik pesisir.";


    if (
        land ===
        "Tambak"
    ) {

        landText =
            "Dominasi tambak meningkatkan sensitivitas karena kawasan umumnya berada pada dataran rendah, memiliki material relatif lunak, dan perlindungan vegetasi alami yang terbatas.";

    }


    else if (
        land ===
        "Muara"
    ) {

        landText =
            "Posisi pada kawasan muara meningkatkan dinamika morfologi karena garis pantai dipengaruhi oleh interaksi suplai sedimen sungai, gelombang, arus, dan perubahan posisi mulut sungai.";

    }


    else if (
        land ===
        "Pelabuhan"
    ) {

        landText =
            "Keberadaan pelabuhan dan struktur keras dapat meningkatkan kestabilan lokal, tetapi juga mengubah jalur transpor sedimen sehingga tekanan abrasi dapat terdistribusi ke segmen yang berdekatan.";

    }


    else if (
        land ===
        "Bangunan"
    ) {

        landText =
            "Perkembangan kawasan terbangun meningkatkan keterpaparan aset pesisir. Struktur keras dapat memberikan perlindungan lokal, tetapi kemampuan pantai untuk menyesuaikan diri secara alami menjadi lebih terbatas.";

    }


    else if (
        land ===
        "Pantai"
    ) {

        landText =
            "Segmen masih didominasi karakter pantai. Kerentanannya terutama dikontrol oleh geomorfologi, elevasi, slope, dinamika shoreline, dan proses oseanografi.";

    }


    const factorText =

        factors.length

        ?

        "Kerentanan pada tahun yang dipilih terutama diperkuat oleh " +
        factors.join(", ") +
        "."

        :

        "Tidak terdapat dominasi skor tinggi pada parameter fisik utama pada tahun yang dipilih.";


    return {

        landText:
            landText,

        factorText:
            factorText

    };

}



// =========================================================
// 27. PANEL DETAIL CVI TOTAL
// =========================================================

function createCviDetailPanel() {

    const mapBox =
        document.querySelector(
            "#hasil-cvi .cvi-map-box"
        );


    if (!mapBox) {

        return null;

    }


    let panel =
        document.getElementById(
            "cviDetailPanel"
        );


    if (
        panel
    ) {

        return panel;

    }


    createCviStatsPopup();


    panel =
        document.createElement(
            "div"
        );


    panel.id =
        "cviDetailPanel";


    panel.innerHTML = `

        <div class="cvi-detail-header">

            <div>

                <span>
                    ANALISIS CVI PER SEGMEN
                </span>

                <h3 id="cviDetailName">
                    -
                </h3>

            </div>


            <button
                id="cviDetailClose"
                type="button">

                ×

            </button>

        </div>


        <div
            id="cviDetailBody"
            class="cvi-detail-body">
        </div>

    `;


    mapBox.appendChild(
        panel
    );


    document
        .getElementById(
            "cviDetailClose"
        )
        .addEventListener(
            "click",
            function() {

                panel
                    .classList
                    .remove("show");

            }
        );


    return panel;

}



function closeCviDetailPanel() {

    const panel =
        document.getElementById(
            "cviDetailPanel"
        );


    if (
        panel
    ) {

        panel
            .classList
            .remove("show");

    }

}



// =========================================================
// 28. TAMPILKAN DETAIL CVI TOTAL
// =========================================================

function showCviTotalDetail(
    props,
    nama
) {

    const panel =
        createCviDetailPanel();


    if (
        !panel
    ) {

        return;

    }


    const statsPopup =
        document.getElementById(
            "cviStatsPopup"
        );


    if (
        statsPopup
    ) {

        statsPopup
            .classList
            .remove("show");

    }


    const year =
        getFeatureYear(
            props
        )
        ??
        "-";


    const value =
        props[
            CVI_FIELDS.cvi
        ]
        ??
        "-";


    const classText =

        props[
            CVI_FIELDS.cviClassText
        ]

        ??

        getVulnerabilityLabel(
            props[
                CVI_FIELDS.cviClass
            ]
        );


    const type =
        props[
            CVI_FIELDS.landType
        ]
        ??
        "-";


    const land =
        normalizeLandUse(
            props[
                CVI_FIELDS.landRaw
            ]
        )
        ??
        "-";


    const geom =
        normalizeGeomLap(
            props[
                CVI_FIELDS.geomRaw
            ]
        )
        ??
        "-";


    const historySummary =
        getLandHistorySummary(
            nama
        );


    const discussion =
        getCviTotalDiscussion(
            props,
            nama
        );


    const nameEl =
        document.getElementById(
            "cviDetailName"
        );


    const body =
        document.getElementById(
            "cviDetailBody"
        );


    nameEl.textContent =
        `${nama} · ${year}`;


    const isArtificial =

        normalizeText(
            type
        )

        ===

        "buatan";


    let transitionRows =
        "";


    if (
        historySummary
            .firstArtificial
    ) {

        transitionRows += `

            <div class="cvi-detail-row">

                <span>
                    Pertama teridentifikasi Buatan
                </span>

                <strong>
                    ${historySummary.firstArtificial}
                </strong>

            </div>

        `;

    }


    if (
        historySummary
            .sustainedArtificial
    ) {

        transitionRows += `

            <div class="cvi-detail-row">

                <span>
                    Buatan berkelanjutan sejak
                </span>

                <strong>
                    ${historySummary.sustainedArtificial}
                </strong>

            </div>

        `;

    }



    // =====================================================
    // RIWAYAT TAHUNAN
    // =====================================================

    const historyHtml =
        historySummary
            .history
            .map(
                function(feature) {

                    const p =
                        feature
                            .properties ||
                        {};


                    const y =
                        getFeatureYear(
                            p
                        )
                        ??
                        "-";


                    const l =
                        normalizeLandUse(
                            p[
                                CVI_FIELDS.landRaw
                            ]
                        )
                        ??
                        "-";


                    const t =
                        p[
                            CVI_FIELDS.landType
                        ]
                        ??
                        "-";


                    const typeClass =

                        normalizeText(
                            t
                        )

                        ===

                        "buatan"

                        ?

                        "buatan"

                        :

                        "natural";


                    return `

                        <div class="cvi-history-row">

                            <span class="cvi-history-year">
                                ${y}
                            </span>


                            <span class="cvi-history-land">
                                ${l}
                            </span>


                            <span
                                class="
                                    cvi-history-type
                                    ${typeClass}
                                "
                            >
                                ${t}
                            </span>

                        </div>

                    `;

                }
            )
            .join("");


    body.innerHTML = `

        <div
            class="
                cvi-detail-status
                ${isArtificial ? "buatan" : ""}
            "
        >

            <span>
                JENIS PERUBAHAN LAHAN
            </span>

            <strong>
                ${type}
            </strong>

        </div>



        <div class="cvi-detail-table">

            <div class="cvi-detail-row">

                <span>
                    Tahun dipilih
                </span>

                <strong>
                    ${year}
                </strong>

            </div>


            <div class="cvi-detail-row">

                <span>
                    Nilai CVI
                </span>

                <strong>
                    ${formatNumber(value)}
                </strong>

            </div>


            <div class="cvi-detail-row">

                <span>
                    Kelas CVI
                </span>

                <strong>
                    ${classText}
                </strong>

            </div>


            <div class="cvi-detail-row">

                <span>
                    Tutupan Lahan
                </span>

                <strong>
                    ${land}
                </strong>

            </div>


            <div class="cvi-detail-row">

                <span>
                    Geomorfologi
                </span>

                <strong>
                    ${geom}
                </strong>

            </div>


            ${transitionRows}

        </div>



        <div class="cvi-section">

            <span class="cvi-section-tag">
                01 / RIWAYAT
            </span>

            <h4>
                Perubahan Natural–Buatan
            </h4>

            <p>
                ${historySummary.text}
            </p>

        </div>



        <div class="cvi-section">

            <span class="cvi-section-tag">
                02 / TIMELINE
            </span>

            <h4>
                Riwayat Segmen 1988–2025
            </h4>

            <p>
                Perubahan di bawah merupakan
                klasifikasi yang teridentifikasi
                pada data tiap tahun, bukan tanggal
                pasti pembangunan struktur.
            </p>


            <div class="cvi-history">

                ${historyHtml}

            </div>

        </div>



        <div class="cvi-section">

            <span class="cvi-section-tag">
                03 / KONDISI LAHAN
            </span>

            <h4>
                Mengapa kondisi ini penting?
            </h4>

            <p>
                ${discussion.landText}
            </p>

        </div>



        <div class="cvi-section">

            <span class="cvi-section-tag">
                04 / KERENTANAN
            </span>

            <h4>
                Faktor yang memperkuat CVI
            </h4>

            <p>
                ${discussion.factorText}
            </p>


            <div class="cvi-score-pills">

                <span class="cvi-score-pill">
                    Shoreline ·
                    ${props.SKOR_SHORE ?? "-"}
                </span>


                <span class="cvi-score-pill">
                    Geomorfologi ·
                    ${props.SKOR_GEOM ?? "-"}
                </span>


                <span class="cvi-score-pill">
                    Slope ·
                    ${props.SKOR_SLOPE ?? "-"}
                </span>


                <span class="cvi-score-pill">
                    Elevasi ·
                    ${props.SKOR_ELEV ?? "-"}
                </span>


                <span class="cvi-score-pill">
                    Gelombang ·
                    ${props.SKOR_GEL ?? "-"}
                </span>


                <span class="cvi-score-pill">
                    Pasut ·
                    ${props.SKOR_PASUT ?? "-"}
                </span>


                <span class="cvi-score-pill">
                    SLR ·
                    ${props.SKOR_SLR ?? "-"}
                </span>


                <span class="cvi-score-pill">
                    Lahan ·
                    ${props.SKOR_LAHAN ?? "-"}
                </span>

            </div>

        </div>

    `;


    body.scrollTop =
        0;


    panel
        .classList
        .add("show");

}



// =========================================================
// 29. UPDATE PARAMETER CVI
// =========================================================

function updateCviParameter(
    parameter,
    showStats = true
) {

    cviActiveParameter =
        parameter;


    if (
        cviLinePopup
    ) {

        cviLinePopup.remove();

        cviLinePopup =
            null;

    }


    if (
        parameter !==
        "CVI_TOTAL"
    ) {

        closeCviDetailPanel();

    }


    const info =
        cviParameterInfo[
            parameter
        ];


    if (
        !info
    ) {

        return;

    }


    document
        .querySelectorAll(
            ".cvi-param-btn[data-param]"
        )
        .forEach(
            function(button) {

                button
                    .classList
                    .toggle(

                        "active",

                        button
                            .getAttribute(
                                "data-param"
                            )
                        ===
                        parameter

                    );

            }
        );


    const currentTitle =
        document.getElementById(
            "cviCurrentTitle"
        );


    const currentParameter =
        document.getElementById(
            "cviCurrentParameter"
        );


    const infoTitle =
        document.getElementById(
            "cviInfoTitle"
        );


    const infoText =
        document.getElementById(
            "cviInfoText"
        );


    const legendTitle =
        document.getElementById(
            "cviLegendTitle"
        );


    if (
        currentTitle
    ) {

        currentTitle.textContent =
            info.title;

    }


    if (
        currentParameter
    ) {

        currentParameter.textContent =
            info.shortTitle;

    }


    if (
        infoTitle
    ) {

        infoTitle.textContent =
            info.shortTitle;

    }


    if (
        infoText
    ) {

        infoText.textContent =
            info.text;

    }


    if (
        legendTitle
    ) {

        legendTitle.textContent =

            parameter ===
            "CVI_TOTAL"

            ?

            "Kelas Kerentanan CVI"

            :

            "Skor " +
            info.shortTitle;

    }


    if (
        cviMap &&
        cviMap.getLayer(
            "cvi-lines"
        )
    ) {

        cviMap.setPaintProperty(

            "cvi-lines",

            "line-color",

            getCviColorExpression(
                parameter
            )

        );

    }


    if (
        showStats
    ) {

        showCviStatistics(
            parameter
        );

    }

}



// =========================================================
// 30. BUTTON CVI
// =========================================================

function initCviParameterButtons() {

    document
        .querySelectorAll(
            ".cvi-param-btn[data-param]"
        )
        .forEach(
            function(button) {

                button.addEventListener(

                    "click",

                    function() {

                        updateCviParameter(

                            button
                                .getAttribute(
                                    "data-param"
                                ),

                            true

                        );

                    }

                );

            }
        );

}



// =========================================================
// 31. POPUP GARIS PARAMETER
// =========================================================

function showCviParameterPopup(
    e,
    props,
    nama,
    tahun
) {

    const data =
        getCviLinePopupData(

            props,

            cviActiveParameter

        );


    const score =
        Number(
            data.score
        );


    const classLabel =
        getParameterClassLabel(

            cviActiveParameter,

            score

        );


    const vulnerability =
        getVulnerabilityLabel(
            score
        );


    const discussion =
        getParameterDiscussion(

            cviActiveParameter,

            score,

            props

        );


    let categoryRow =
        "";


    if (
        data.rawLabel !==
        null &&
        data.rawLabel !==
        undefined
    ) {

        categoryRow = `

            <div class="popup-row">

                <span>
                    Kondisi
                </span>

                <b>
                    ${data.rawLabel}
                </b>

            </div>

        `;

    }


    const html = `

        <div class="dsas-popup cvi-param-popup">

            <div class="dsas-popup-header">

                <span>
                    ${data.parameter}
                </span>

                <strong>
                    ${nama}
                </strong>

            </div>


            <div class="dsas-popup-body">

                <div class="popup-row">

                    <span>
                        Tahun
                    </span>

                    <b>
                        ${tahun}
                    </b>

                </div>


                ${categoryRow}


                <div class="popup-row">

                    <span>
                        Skor
                    </span>

                    <b>
                        ${data.score ?? "-"}
                    </b>

                </div>


                <div class="popup-row">

                    <span>
                        Kelas Parameter
                    </span>

                    <b>
                        ${classLabel}
                    </b>

                </div>


                <div class="popup-row">

                    <span>
                        Tingkat Kerentanan
                    </span>

                    <b>
                        ${vulnerability}
                    </b>

                </div>


                <div class="cvi-param-title">

                    INTERPRETASI

                </div>


                <div class="cvi-param-discussion">

                    ${discussion}

                </div>

            </div>

        </div>

    `;


    if (
        cviLinePopup
    ) {

        cviLinePopup.remove();

    }


    cviLinePopup =
        new maplibregl.Popup({

            closeButton:
                true,

            closeOnClick:
                true,

            maxWidth:
                "330px"

        })

            .setLngLat(
                e.lngLat
            )

            .setHTML(
                html
            )

            .addTo(
                cviMap
            );

}



// =========================================================
// 32. INIT CVI MAP
// =========================================================

function initCviMap() {

    if (
        cviMapInitialized
    ) {

        return;

    }


    const container =
        document.getElementById(
            "cviMap"
        );


    if (
        !container ||
        typeof maplibregl ===
        "undefined"
    ) {

        return;

    }


    cviMapInitialized =
        true;


    cviMap =
        new maplibregl.Map({

            container:
                "cviMap",

            style:
                makeOsmStyle(
                    "osm-cvi"
                ),

            center: [

                109.13,
                -6.845

            ],

            zoom:
                11

        });


    cviMap.addControl(

        new maplibregl
            .NavigationControl(),

        "top-right"

    );


    cviMap.on(

        "load",

        async function() {

            try {

                cviGeoJSON =
                    await loadCviGeoJSON();


                const features =
                    cviGeoJSON.features ||
                    [];


                console.log(
                    "TOTAL CVI:",
                    features.length
                );


                console.log(
                    "CONTOH ATRIBUT CVI:",
                    features[0]
                        ?.properties ||
                    {}
                );


                cviMap.addSource(

                    "cvi-data",

                    {

                        type:
                            "geojson",

                        data:
                            cviGeoJSON

                    }

                );


                cviMap.addLayer({

                    id:
                        "cvi-lines",

                    type:
                        "line",

                    source:
                        "cvi-data",

                    layout: {

                        "line-cap":
                            "round",

                        "line-join":
                            "round"

                    },

                    paint: {

                        "line-width": [

                            "interpolate",

                            ["linear"],

                            ["zoom"],

                            10,
                            4,

                            13,
                            7

                        ],

                        "line-opacity":
                            0.98,

                        "line-color":
                            getCviColorExpression(
                                "CVI_TOTAL"
                            )

                    }

                });



                // =================================================
                // FIT BOUNDS
                // =================================================

                const bounds =
                    new maplibregl
                        .LngLatBounds();


                features.forEach(
                    function(feature) {

                        if (
                            feature
                                ?.geometry
                                ?.coordinates
                        ) {

                            extendBoundsRecursive(

                                bounds,

                                feature
                                    .geometry
                                    .coordinates

                            );

                        }

                    }
                );


                if (
                    !bounds.isEmpty()
                ) {

                    cviMap.fitBounds(

                        bounds,

                        {

                            padding:
                                55,

                            maxZoom:
                                13.5,

                            duration:
                                800

                        }

                    );

                }



                // =================================================
                // KLIK GARIS
                // =================================================

                cviMap.on(

                    "click",

                    "cvi-lines",

                    function(e) {

                        if (
                            !e.features ||
                            !e.features.length
                        ) {

                            return;

                        }


                        const props =
                            e.features[0]
                                .properties ||
                            {};


                        const nama =
                            getFeatureTransectName(
                                props
                            );


                        const tahun =
                            getFeatureYear(
                                props
                            )
                            ??
                            "-";


                        // =========================================
                        // CVI TOTAL
                        // PANEL NATURAL / BUATAN
                        // =========================================

                        if (
                            cviActiveParameter ===
                            "CVI_TOTAL"
                        ) {

                            if (
                                cviLinePopup
                            ) {

                                cviLinePopup.remove();

                                cviLinePopup =
                                    null;

                            }


                            showCviTotalDetail(

                                props,

                                nama

                            );


                            return;

                        }



                        // =========================================
                        // PARAMETER LAIN
                        // POPUP KHUSUS PARAMETER
                        // =========================================

                        closeCviDetailPanel();


                        showCviParameterPopup(

                            e,

                            props,

                            nama,

                            tahun

                        );

                    }

                );


                cviMap.on(

                    "mouseenter",

                    "cvi-lines",

                    function() {

                        cviMap
                            .getCanvas()
                            .style
                            .cursor =
                            "pointer";

                    }

                );


                cviMap.on(

                    "mouseleave",

                    "cvi-lines",

                    function() {

                        cviMap
                            .getCanvas()
                            .style
                            .cursor =
                            "";

                    }

                );


                // =================================================
                // DEFAULT CVI TOTAL
                // =================================================

                updateCviParameter(

                    "CVI_TOTAL",

                    false

                );


                setTimeout(

                    function() {

                        cviMap.resize();

                    },

                    200

                );

            }

            catch(error) {

                console.error(
                    "ERROR CVI:",
                    error
                );


                container.innerHTML = `

                    <div
                        style="
                            height:100%;
                            min-height:550px;
                            display:flex;
                            align-items:center;
                            justify-content:center;
                            padding:30px;
                            text-align:center;
                            background:#eef1ef;
                            color:#8a3030;
                        "
                    >

                        <div>

                            <strong>
                                Peta CVI gagal dimuat
                            </strong>

                            <br><br>

                            Periksa F12 → Console.

                        </div>

                    </div>

                `;

            }

        }

    );

}



// =========================================================
// 33. RESIZE OBSERVER
// =========================================================

function initMapResizeObserver() {

    const targets = [

        {

            element:
                document.getElementById(
                    "latar-belakang"
                ),

            getMap:
                function() {

                    return storyMap;

                }

        },


        {

            element:
                document.getElementById(
                    "hasil-dsas"
                ),

            getMap:
                function() {

                    return dsasMap;

                }

        },


        {

            element:
                document.getElementById(
                    "hasil-cvi"
                ),

            getMap:
                function() {

                    return cviMap;

                }

        }

    ];


    const observer =
        new IntersectionObserver(

            function(entries) {

                entries.forEach(
                    function(entry) {

                        if (
                            !entry
                                .isIntersecting
                        ) {

                            return;

                        }


                        const item =
                            targets.find(
                                function(target) {

                                    return (
                                        target.element ===
                                        entry.target
                                    );

                                }
                            );


                        const map =
                            item?.getMap();


                        if (
                            map
                        ) {

                            setTimeout(

                                function() {

                                    map.resize();

                                },

                                150

                            );

                        }

                    }
                );

            },

            {

                threshold:
                    0.05

            }

        );


    targets.forEach(
        function(item) {

            if (
                item.element
            ) {

                observer.observe(
                    item.element
                );

            }

        }
    );

}



// =========================================================
// 34. INIT SEMUA
// =========================================================

window.addEventListener(

    "DOMContentLoaded",

    function() {

        try {

            initNavigation();

            initResearchQuestions();

            initMethodSteps();

            initStoryMap();

            initStoryPanels();

            initDsasMap();

            initDsasMap();

            initCviParameterButtons();

            initCviMap();

            initMapResizeObserver();

            initRfMap();

        }

        catch(error) {

            console.error(

                "ERROR INIT WEBGIS:",

                error

            );

        }

    }

);
// =========================================================
// PROKSI NERACA SEDIMEN
// FINAL — ANALISIS_SEDIMEN + PEMBAGIAN_SEL
// =========================================================


// =========================================================
// 01. GLOBAL
// =========================================================

let sedimentMap = null;
let sedimentMapInitialized = false;

let sedimentGeoJSON = null;
let sedimentCellGeoJSON = null;

let sedimentPopup = null;

let sedimentActivePeriod = "1988-2000";
let sedimentActiveCell = "ALL";


const SEDIMENT_PERIODS = [
    "1988-2000",
    "2001-2012",
    "2013-2025"
];


const SEDIMENT_CLASS_ORDER = [
    "Surplus / Deposisi",
    "Deposisi Lokal",
    "Relatif Seimbang",
    "Bypass / Export",
    "Defisit / Erosi"
];


const SEDIMENT_CLASS_COLORS = {

    "Surplus / Deposisi":
        "#16896a",

    "Deposisi Lokal":
        "#65b888",

    "Relatif Seimbang":
        "#e3c45e",

    "Bypass / Export":
        "#e68a4f",

    "Defisit / Erosi":
        "#cf3f35"

};



// =========================================================
// 02. FIELD DATA
// =========================================================

let sedimentResolvedFields = {

    period: null,
    year: null,

    cell: null,

    className: null,

    transect: null,

    tss: null,

    tssStatus: null,

    hs: null,

    mwd: null,

    mwp: null,

    distanceMouth: null,

    shoreline: null,

    respon: null,

    namaSungai: null,

    muaraId: null

};



// =========================================================
// 03. HELPER SEMUA NAMA FIELD
// =========================================================

function sedimentGetAllKeys(features) {

    const keys = new Set();


    (features || [])
        .slice(0, 200)
        .forEach(function(feature) {

            Object
                .keys(
                    feature.properties || {}
                )
                .forEach(function(key) {

                    keys.add(key);

                });

        });


    return Array.from(keys);

}



// =========================================================
// 04. NORMALISASI NAMA FIELD
// =========================================================

function sedimentNormalizeFieldName(text) {

    return String(text || "")
        .toLowerCase()
        .replace(/[()\/\-]/g, " ")
        .replace(/_/g, " ")
        .replace(/\s+/g, " ")
        .trim();

}



// =========================================================
// 05. CARI FIELD BERDASARKAN NAMA
// =========================================================

function sedimentFindField(
    features,
    aliases
) {

    const keys =
        sedimentGetAllKeys(features);


    // =============================================
    // EXACT NORMALIZED MATCH
    // =============================================

    for (const alias of aliases) {

        const aliasNorm =
            sedimentNormalizeFieldName(alias);


        for (const key of keys) {

            const keyNorm =
                sedimentNormalizeFieldName(key);


            if (
                keyNorm ===
                aliasNorm
            ) {

                return key;

            }

        }

    }



    // =============================================
    // PARTIAL MATCH
    // berguna jika nama field terpotong
    // saat lewat shapefile / DBF
    // =============================================

    for (const alias of aliases) {

        const aliasNorm =
            sedimentNormalizeFieldName(alias);


        for (const key of keys) {

            const keyNorm =
                sedimentNormalizeFieldName(key);


            if (
                aliasNorm.length >= 5 &&
                (
                    keyNorm.includes(aliasNorm) ||
                    aliasNorm.includes(keyNorm)
                )
            ) {

                return key;

            }

        }

    }


    return null;

}



// =========================================================
// 06. CARI FIELD BERDASARKAN ISI
// =========================================================

function sedimentFindFieldByValues(
    features,
    tester
) {

    const keys =
        sedimentGetAllKeys(features);


    let bestField = null;

    let bestScore = 0;


    for (const key of keys) {

        let tested = 0;
        let matched = 0;


        for (
            const feature
            of (features || []).slice(0, 300)
        ) {

            const value =
                feature
                    ?.properties
                    ?.[key];


            if (
                value === null ||
                value === undefined ||
                value === ""
            ) {

                continue;

            }


            tested++;


            if (
                tester(value)
            ) {

                matched++;

            }

        }


        if (!tested) continue;


        const ratio =
            matched / tested;


        if (
            matched >= 2 &&
            ratio > bestScore
        ) {

            bestScore =
                ratio;

            bestField =
                key;

        }

    }


    return (
        bestScore >= 0.55
        ?
        bestField
        :
        null
    );

}



// =========================================================
// 07. DETEKSI SEMUA FIELD
// =========================================================

function resolveSedimentFields(features) {


    // =====================================================
    // FALLBACK — PERIODE BERDASARKAN NILAI
    // =====================================================

    const periodByValue =
        sedimentFindFieldByValues(

            features,

            function(value) {

                const t =
                    String(value)
                        .replace(/[–—]/g, "-")
                        .replace(/\s+/g, "");


                return (

                    (
                        t.includes("1988") &&
                        t.includes("2000")
                    )

                    ||

                    (
                        t.includes("2001") &&
                        t.includes("2012")
                    )

                    ||

                    (
                        t.includes("2013") &&
                        t.includes("2025")
                    )

                );

            }

        );



    // =====================================================
    // FALLBACK — SEL BERDASARKAN NILAI
    // =====================================================

    const cellByValue =
        sedimentFindFieldByValues(

            features,

            function(value) {

                const t =
                    normalizeText(value);


                return (

                    t.includes("barat") ||

                    t.includes("tengah") ||

                    t.includes("timur")

                );

            }

        );



    // =====================================================
    // FALLBACK — PROKSI BERDASARKAN NILAI
    // =====================================================

    const classByValue =
        sedimentFindFieldByValues(

            features,

            function(value) {

                const t =
                    normalizeText(value);


                return (

                    t.includes("surplus") ||

                    t.includes("deposisi lokal") ||

                    t.includes("seimbang") ||

                    t.includes("bypass") ||

                    t.includes("export") ||

                    t.includes("defisit") ||

                    t.includes("erosi")

                );

            }

        );



    // =====================================================
    // FALLBACK — TRANSEK T01, T02, DST
    // =====================================================

    const transectByValue =
        sedimentFindFieldByValues(

            features,

            function(value) {

                return /^t\s*\d+$/i
                    .test(
                        String(value)
                            .trim()
                    );

            }

        );



    // =====================================================
    // RESOLVE FIELD FINAL
    // =====================================================

    sedimentResolvedFields = {


        // =============================================
        // PERIODE
        // =============================================

        period:

            sedimentFindField(

                features,

                [
                    "PERIODE",
                    "Periode",
                    "periode",
                    "PERIOD"
                ]

            )

            ||

            periodByValue,



        // =============================================
        // TAHUN
        // =============================================

        year:

            sedimentFindField(

                features,

                [
                    "TAHUN",
                    "Tahun",
                    "tahun",
                    "YEAR",
                    "Year"
                ]

            ),



        // =============================================
        // SEL / ZONA
        // =============================================

        cell:

            sedimentFindField(

                features,

                [
                    "ZONA",
                    "Zona",
                    "zona",

                    "SEL",
                    "Sel",
                    "sel",

                    "SEL_SEDIMEN",

                    "ZONA_SEL",

                    "NAMA_SEL",

                    "NAMA_ZONA"
                ]

            )

            ||

            cellByValue,



        // =============================================
        // KELAS PROKSI
        // =============================================

        className:

            sedimentFindField(

                features,

                [
                    "PROKSI_NERACA_SEDIMEN",

                    "PROKSI_NERACA_SE",

                    "PROKSI_NERACA",

                    "PROKSI_SEDIMEN",

                    "KELAS_PROKSI",

                    "KATEGORI_PROKSI",

                    "PROKSI",

                    "KELAS"
                ]

            )

            ||

            classByValue,



        // =============================================
        // NAMA TITIK
        // =============================================

        transect:

            sedimentFindField(

                features,

                [
                    "NAMA_TITIK",

                    "Nama_Titik",

                    "Nama titik",

                    "NAMA_TITI",

                    "TRANSECTID",

                    "TRANSECT_ID",

                    "ID_TRANSEK",

                    "NAMA_TRANSEK",

                    "TRANSEK"
                ]

            )

            ||

            transectByValue,



        // =============================================
        // TSS MEDIAN
        // =============================================

        tss:

            sedimentFindField(

                features,

                [
                    "TSS Median (mg/L)",

                    "TSS_MEDIAN",

                    "TSS Median",

                    "TSS_MEDIAN_VALID",

                    "TSS Rata-rata (mg/L)",

                    "TSS_RATA_RATA",

                    "TSS_MEAN",

                    "TSS"
                ]

            ),



        // =============================================
        // TSS BATAS
        // =============================================

        tssStatus:

            sedimentFindField(

                features,

                [
                    "TSS_BATAS",

                    "TSS BATAS",

                    "STATUS_TSS",

                    "TSS_STATUS",

                    "KATEGORI_TSS",

                    "KELAS_TSS"
                ]

            ),



        // =============================================
        // HS
        // =============================================

        hs:

            sedimentFindField(

                features,

                [
                    "Hs",
                    "HS",
                    "H_S",
                    "MEAN_HS",
                    "HS_MEAN"
                ]

            ),



        // =============================================
        // MWD
        // =============================================

        mwd:

            sedimentFindField(

                features,

                [
                    "MWD_circular_deg",

                    "MWD circular deg",

                    "MWD_CIRCULAR_DEG",

                    "MWD",

                    "Mean_Wave_Direction",

                    "MEAN_MWD",

                    "MWD_MEAN"
                ]

            ),



        // =============================================
        // MWP
        // =============================================

        mwp:

            sedimentFindField(

                features,

                [
                    "MWP_mean_s",

                    "MWP mean s",

                    "MWP_MEAN_S",

                    "MWP",

                    "Mean_Wave_Period",

                    "MEAN_MWP",

                    "MWP_MEAN"
                ]

            ),



        // =============================================
        // JARAK MUARA
        // =============================================

        distanceMouth:

            sedimentFindField(

                features,

                [
                    "JARAK_MUARA",

                    "JARAK MUARA",

                    "DIST_MUARA",

                    "DISTANCE_MUARA",

                    "NEAR_DIST",

                    "JARAK"
                ]

            ),



        // =============================================
        // D MEDIAN / DELTA D
        // =============================================

        shoreline:

            sedimentFindField(

                features,

                [
                    "D MEDIAN",

                    "D_MEDIAN",

                    "D Median",

                    "DELTA D",

                    "DELTA_D",

                    "D MEAN",

                    "D_MEAN",

                    "LRR",

                    "SHORE_CHANGE"
                ]

            ),



        // =============================================
        // RESPON
        // =============================================

        respon:

            sedimentFindField(

                features,

                [
                    "RESPON",

                    "Respon",

                    "RESPONS"
                ]

            ),



        // =============================================
        // NAMA SUNGAI
        // =============================================

        namaSungai:

            sedimentFindField(

                features,

                [
                    "NAMA_SUNGAI",

                    "NAMA SUNGAI",

                    "Nama Sungai",

                    "SUNGAI"
                ]

            ),



        // =============================================
        // MUARA ID
        // =============================================

        muaraId:

            sedimentFindField(

                features,

                [
                    "MUARA_ID",

                    "MUARA ID",

                    "Muara ID",

                    "ID_MUARA"
                ]

            )

    };


    console.log(
        "FIELD SEDIMEN TERDETEKSI:",
        sedimentResolvedFields
    );

}



// =========================================================
// 08. NORMALISASI PERIODE
// =========================================================

function normalizeSedimentPeriod(
    value,
    yearValue = null
) {

    const text =
        String(
            value ?? ""
        )
            .trim()
            .replace(
                /[–—]/g,
                "-"
            )
            .replace(
                /\s+/g,
                ""
            );


    if (
        text.includes("1988") &&
        text.includes("2000")
    ) {

        return "1988-2000";

    }


    if (
        text.includes("2001") &&
        text.includes("2012")
    ) {

        return "2001-2012";

    }


    if (
        text.includes("2013") &&
        text.includes("2025")
    ) {

        return "2013-2025";

    }



    const year =
        Number(yearValue);


    if (
        Number.isFinite(year)
    ) {


        if (
            year >= 1988 &&
            year <= 2000
        ) {

            return "1988-2000";

        }


        if (
            year >= 2001 &&
            year <= 2012
        ) {

            return "2001-2012";

        }


        if (
            year >= 2013 &&
            year <= 2025
        ) {

            return "2013-2025";

        }

    }


    return null;

}



// =========================================================
// 09. NORMALISASI SEL
// =========================================================

function normalizeSedimentCell(value) {

    const text =
        normalizeText(value);


    if (!text) {
        return null;
    }


    if (
        text.includes("barat") ||
        text === "west"
    ) {

        return "BARAT";

    }


    if (
        text.includes("tengah") ||
        text.includes("central")
    ) {

        return "TENGAH";

    }


    if (
        text.includes("timur") ||
        text === "east"
    ) {

        return "TIMUR";

    }


    return String(value)
        .trim()
        .toUpperCase();

}



function sedimentCellDisplay(value) {

    if (
        value === "BARAT"
    ) {

        return "Sel Barat";

    }


    if (
        value === "TENGAH"
    ) {

        return "Sel Tengah";

    }


    if (
        value === "TIMUR"
    ) {

        return "Sel Timur";

    }


    return "Semua Sel";

}



// =========================================================
// 10. NORMALISASI KELAS PROKSI
// =========================================================

function normalizeSedimentClass(value) {

    const text =
        String(value || "")
            .toLowerCase()
            .replace(/[_-]+/g, " ")
            .replace(/\s+/g, " ")
            .trim();


    if (!text) {
        return null;
    }



    // =====================================================
    // DEPOSISI LOKAL
    // harus sebelum pengecekan deposisi umum
    // =====================================================

    if (
        text.includes("deposisi lokal") ||
        text.includes("deposit lokal")
    ) {

        return "Deposisi Lokal";

    }



    // =====================================================
    // SURPLUS / DEPOSISI
    // =====================================================

    if (
        text.includes("surplus") ||
        text === "deposisi"
    ) {

        return "Surplus / Deposisi";

    }



    // =====================================================
    // SEIMBANG
    // =====================================================

    if (
        text.includes("relatif seimbang") ||
        text.includes("seimbang") ||
        text === "stabil"
    ) {

        return "Relatif Seimbang";

    }



    // =====================================================
    // BYPASS / EXPORT
    // =====================================================

    if (
        text.includes("bypass") ||
        text.includes("export")
    ) {

        return "Bypass / Export";

    }



    // =====================================================
    // DEFISIT / EROSI
    // =====================================================

    if (
        text.includes("defisit") ||
        text.includes("erosi")
    ) {

        return "Defisit / Erosi";

    }


    return String(value).trim();

}



// =========================================================
// 11. REPRESENTATIVE POINT
// =========================================================

function sedimentRepresentativePoint(feature) {

    if (
        !feature
            ?.geometry
            ?.coordinates
    ) {

        return null;

    }


    const pairs = [];


    function collect(coords) {

        if (
            !Array.isArray(coords)
        ) {

            return;

        }


        if (
            coords.length >= 2 &&
            typeof coords[0] === "number" &&
            typeof coords[1] === "number"
        ) {

            pairs.push([
                coords[0],
                coords[1]
            ]);

            return;

        }


        coords.forEach(collect);

    }


    collect(
        feature.geometry.coordinates
    );


    if (!pairs.length) {
        return null;
    }


    const sum =
        pairs.reduce(

            function(acc, pair) {

                acc[0] += pair[0];

                acc[1] += pair[1];

                return acc;

            },

            [0, 0]

        );


    return [

        sum[0] / pairs.length,

        sum[1] / pairs.length

    ];

}



// =========================================================
// 12. POINT IN RING
// =========================================================

function pointInRing(
    point,
    ring
) {

    const x =
        point[0];

    const y =
        point[1];


    let inside =
        false;


    for (
        let i = 0,
        j = ring.length - 1;

        i < ring.length;

        j = i++
    ) {

        const xi =
            ring[i][0];

        const yi =
            ring[i][1];

        const xj =
            ring[j][0];

        const yj =
            ring[j][1];


        const intersect =

            (
                (yi > y) !==
                (yj > y)
            )

            &&

            (
                x <
                (
                    (xj - xi) *
                    (y - yi) /
                    (
                        (yj - yi) ||
                        1e-12
                    )
                )
                +
                xi
            );


        if (intersect) {

            inside =
                !inside;

        }

    }


    return inside;

}



// =========================================================
// 13. POINT IN POLYGON
// =========================================================

function pointInPolygonGeometry(
    point,
    geometry
) {

    if (!geometry) {
        return false;
    }



    if (
        geometry.type === "Polygon"
    ) {

        const rings =
            geometry.coordinates || [];


        if (!rings.length) {
            return false;
        }


        if (
            !pointInRing(
                point,
                rings[0]
            )
        ) {

            return false;

        }


        for (
            let i = 1;
            i < rings.length;
            i++
        ) {

            if (
                pointInRing(
                    point,
                    rings[i]
                )
            ) {

                return false;

            }

        }


        return true;

    }



    if (
        geometry.type === "MultiPolygon"
    ) {

        return (
            geometry.coordinates || []
        )
            .some(function(polygon) {

                return pointInPolygonGeometry(

                    point,

                    {
                        type:
                            "Polygon",

                        coordinates:
                            polygon
                    }

                );

            });

    }


    return false;

}



// =========================================================
// 14. FIELD NAMA SEL POLYGON
// =========================================================

function resolveSedimentCellNameField(
    cellFeatures
) {

    return sedimentFindField(

        cellFeatures,

        [
            "ZONA",
            "Zona",

            "SEL",
            "Sel",

            "NAMA_SEL",

            "NAMA_ZONA",

            "NAME",

            "NAMOBJ"
        ]

    );

}



// =========================================================
// 15. TAMBAHKAN FIELD INTERNAL
// =========================================================

function assignSedimentDerivedProperties() {

    if (
        !sedimentGeoJSON?.features
    ) {

        return;

    }


    const cellFeatures =
        sedimentCellGeoJSON
            ?.features ||
        [];


    const cellNameField =
        resolveSedimentCellNameField(
            cellFeatures
        );



    // =====================================================
    // POLYGON SEL
    // =====================================================

    cellFeatures.forEach(

        function(
            feature,
            index
        ) {

            feature.properties =
                feature.properties ||
                {};


            const rawName =

                cellNameField

                ?

                feature
                    .properties[
                        cellNameField
                    ]

                :

                null;


            let normalized =
                normalizeSedimentCell(
                    rawName
                );


            if (
                ![
                    "BARAT",
                    "TENGAH",
                    "TIMUR"
                ].includes(
                    normalized
                )
            ) {

                normalized =

                    [
                        "BARAT",
                        "TENGAH",
                        "TIMUR"
                    ][index]

                    ||

                    String(
                        rawName ||
                        `SEL ${index + 1}`
                    )
                        .toUpperCase();

            }


            feature
                .properties
                .__SEL_CODE =
                normalized;


            feature
                .properties
                .__SEL_LABEL =
                sedimentCellDisplay(
                    normalized
                );

        }

    );



    // =====================================================
    // DATA ANALISIS SEDIMEN
    // =====================================================

    sedimentGeoJSON
        .features
        .forEach(

            function(
                feature,
                index
            ) {

                feature.properties =
                    feature.properties ||
                    {};


                const props =
                    feature.properties;



                // =========================================
                // PERIODE
                // =========================================

                const rawPeriod =

                    sedimentResolvedFields.period

                    ?

                    props[
                        sedimentResolvedFields.period
                    ]

                    :

                    null;



                const rawYear =

                    sedimentResolvedFields.year

                    ?

                    props[
                        sedimentResolvedFields.year
                    ]

                    :

                    null;



                const period =
                    normalizeSedimentPeriod(

                        rawPeriod,

                        rawYear

                    );



                // =========================================
                // SEL
                // =========================================

                const rawCell =

                    sedimentResolvedFields.cell

                    ?

                    props[
                        sedimentResolvedFields.cell
                    ]

                    :

                    null;



                let cell =
                    normalizeSedimentCell(
                        rawCell
                    );



                // =========================================
                // FALLBACK DARI POLYGON
                // =========================================

                if (
                    ![
                        "BARAT",
                        "TENGAH",
                        "TIMUR"
                    ].includes(cell)
                    &&
                    cellFeatures.length
                ) {

                    const point =
                        sedimentRepresentativePoint(
                            feature
                        );


                    if (point) {

                        const containing =
                            cellFeatures.find(

                                function(
                                    cellFeature
                                ) {

                                    return (
                                        pointInPolygonGeometry(

                                            point,

                                            cellFeature.geometry

                                        )
                                    );

                                }

                            );


                        if (containing) {

                            cell =
                                containing
                                    .properties
                                    .__SEL_CODE;

                        }

                    }

                }



                // =========================================
                // PROKSI
                // =========================================

                const rawClass =

                    sedimentResolvedFields
                        .className

                    ?

                    props[
                        sedimentResolvedFields
                            .className
                    ]

                    :

                    null;



                const className =
                    normalizeSedimentClass(
                        rawClass
                    );



                // =========================================
                // TRANSEK
                // =========================================

                const transect =

                    sedimentResolvedFields
                        .transect

                    ?

                    props[
                        sedimentResolvedFields
                            .transect
                    ]

                    :

                    `Feature ${index + 1}`;



                // =========================================
                // FIELD INTERNAL WEBGIS
                // =========================================

                props.__SED_PERIOD =
                    period;


                props.__SED_CELL =
                    cell;


                props.__SED_CLASS =
                    className;


                props.__SED_TRANSECT =
                    transect;

            }

        );

}



// =========================================================
// 16. LOAD ANALISIS_SEDIMEN
// =========================================================

async function loadSedimentGeoJSON() {

    const response =
        await fetch(
            "Data/ANALISIS_SEDIMEN.geojson"
        );


    if (!response.ok) {

        throw new Error(
            "ANALISIS_SEDIMEN.geojson tidak ditemukan"
        );

    }


    const data =
        await response.json();


    if (
        !data ||
        !Array.isArray(data.features)
    ) {

        throw new Error(
            "Format ANALISIS_SEDIMEN.geojson tidak valid"
        );

    }


    return data;

}



// =========================================================
// 17. LOAD PEMBAGIAN SEL
// =========================================================

async function loadSedimentCellGeoJSON() {

    const response =
        await fetch(
            "Data/PEMBAGIAN_SEL.geojson"
        );


    if (!response.ok) {

        throw new Error(
            "PEMBAGIAN_SEL.geojson tidak ditemukan"
        );

    }


    const data =
        await response.json();


    if (
        !data ||
        !Array.isArray(data.features)
    ) {

        throw new Error(
            "Format PEMBAGIAN_SEL.geojson tidak valid"
        );

    }


    return data;

}



// =========================================================
// 18. MAP FILTER
// =========================================================

function getSedimentMapFilter() {

    const periodFilter = [

        "==",

        [
            "get",
            "__SED_PERIOD"
        ],

        sedimentActivePeriod

    ];


    if (
        sedimentActiveCell ===
        "ALL"
    ) {

        return periodFilter;

    }


    return [

        "all",

        periodFilter,

        [

            "==",

            [
                "get",
                "__SED_CELL"
            ],

            sedimentActiveCell

        ]

    ];

}



// =========================================================
// 19. FILTER FEATURE JAVASCRIPT
// =========================================================

function sedimentFeaturesFiltered(

    period =
        sedimentActivePeriod,

    cell =
        sedimentActiveCell

) {

    return (

        sedimentGeoJSON
            ?.features ||
        []

    )
        .filter(

            function(feature) {

                const props =
                    feature.properties || {};


                if (
                    props.__SED_PERIOD !==
                    period
                ) {

                    return false;

                }


                if (
                    cell !== "ALL" &&
                    props.__SED_CELL !==
                    cell
                ) {

                    return false;

                }


                return true;

            }

        );

}



// =========================================================
// 20. STATISTIK PROKSI
// =========================================================

function calculateSedimentSummary(

    period =
        sedimentActivePeriod,

    cell =
        sedimentActiveCell

) {

    const features =
        sedimentFeaturesFiltered(
            period,
            cell
        );


    const counts = {};


    SEDIMENT_CLASS_ORDER
        .forEach(
            function(className) {

                counts[className] =
                    0;

            }
        );


    let valid =
        0;


    features.forEach(

        function(feature) {

            const className =
                normalizeSedimentClass(

                    feature
                        .properties
                        ?.__SED_CLASS

                );


            if (
                !SEDIMENT_CLASS_ORDER
                    .includes(className)
            ) {

                return;

            }


            counts[className]++;

            valid++;

        }

    );


    const rows =

        SEDIMENT_CLASS_ORDER
            .map(

                function(className) {

                    const count =
                        counts[className];


                    return {

                        label:
                            className,

                        count:
                            count,

                        percentage:

                            valid

                            ?

                            count /
                            valid *
                            100

                            :

                            0

                    };

                }

            );


    return {

        totalFeatures:
            features.length,

        valid:
            valid,

        rows:
            rows

    };

}



// =========================================================
// 21. KELAS DOMINAN
// =========================================================

function getSedimentDominantRow(
    summary
) {

    if (
        !summary
            ?.rows
            ?.length
    ) {

        return null;

    }


    return summary
        .rows
        .slice()
        .sort(

            function(a, b) {

                return (
                    b.count -
                    a.count
                );

            }

        )[0];

}



// =========================================================
// 22. INTERPRETASI PROKSI
// =========================================================

function getSedimentInterpretation(
    className
) {

    const texts = {


        "Surplus / Deposisi":

            "Kondisi ini menunjukkan kecenderungan akumulasi sedimen. Garis pantai yang maju dibaca bersama ketersediaan material tersuspensi yang relatif memadai.",



        "Deposisi Lokal":

            "Akresi terjadi meskipun TSS relatif rendah. Kondisi ini mengindikasikan deposisi yang kemungkinan dipengaruhi proses lokal, struktur pantai, atau redistribusi material dari segmen di sekitarnya.",



        "Relatif Seimbang":

            "Perubahan garis pantai relatif kecil sehingga kondisi sedimen ditafsirkan mendekati keseimbangan antara masukan, redistribusi, dan kehilangan material.",



        "Bypass / Export":

            "Material tersuspensi tersedia, tetapi garis pantai tetap mengalami kemunduran. Kondisi ini mengindikasikan material tidak tertahan secara efektif dan berpotensi melewati atau keluar dari segmen.",



        "Defisit / Erosi":

            "Kemunduran garis pantai terjadi bersama ketersediaan material yang relatif rendah, sehingga kondisi lebih konsisten dengan defisit suplai atau kehilangan sedimen."


    };


    return (

        texts[className]

        ||

        "Kelas proksi menggambarkan kecenderungan proses sedimen relatif, bukan neraca sedimen absolut."

    );

}



// =========================================================
// 23. RENDER RINGKASAN PANEL KANAN
// =========================================================

function renderSedimentSummary() {


    const title =
        document.getElementById(
            "sedimentSummaryTitle"
        );


    const subtitle =
        document.getElementById(
            "sedimentSummarySubtitle"
        );


    const rowsContainer =
        document.getElementById(
            "sedimentSummaryRows"
        );


    const interpretation =
        document.getElementById(
            "sedimentSummaryInterpretation"
        );


    const currentPeriod =
        document.getElementById(
            "sedimentCurrentPeriod"
        );


    const currentCell =
        document.getElementById(
            "sedimentCurrentCell"
        );



    const periodDisplay =
        sedimentActivePeriod
            .replace("-", "–");


    const cellDisplay =
        sedimentCellDisplay(
            sedimentActiveCell
        );



    if (currentPeriod) {

        currentPeriod.textContent =
            periodDisplay;

    }


    if (currentCell) {

        currentCell.textContent =
            cellDisplay;

    }


    if (title) {

        title.textContent =
            `${periodDisplay} · ${cellDisplay}`;

    }



    const summary =
        calculateSedimentSummary();



    if (subtitle) {

        subtitle.textContent =

            summary.valid

            ?

            `${summary.valid.toLocaleString("id-ID")} data valid pada filter aktif.`

            :

            "Tidak ada data yang cocok dengan periode dan sel yang dipilih.";

    }



    if (rowsContainer) {

        rowsContainer.innerHTML =

            summary
                .rows
                .map(

                    function(row) {

                        const color =
                            SEDIMENT_CLASS_COLORS[
                                row.label
                            ];


                        const percentageText =
                            row.percentage
                                .toLocaleString(

                                    "id-ID",

                                    {
                                        minimumFractionDigits:
                                            1,

                                        maximumFractionDigits:
                                            1
                                    }

                                );


                        return `

                            <div class="sed-summary-row">

                                <div class="sed-summary-row-top">

                                    <span>
                                        ${row.label}
                                    </span>

                                    <strong>

                                        ${row.count.toLocaleString("id-ID")}

                                        ·

                                        ${percentageText}%

                                    </strong>

                                </div>


                                <div class="sed-summary-bar">

                                    <div
                                        class="sed-summary-fill"
                                        style="
                                            width:${Math.min(
                                                100,
                                                row.percentage
                                            )}%;

                                            background:${color};
                                        ">
                                    </div>

                                </div>

                            </div>

                        `;

                    }

                )
                .join("");

    }



    const dominant =
        getSedimentDominantRow(
            summary
        );



    if (interpretation) {


        if (
            !dominant ||
            dominant.count === 0
        ) {

            interpretation.textContent =
                "Belum ada kelas proksi yang dapat diringkas untuk filter ini.";

        }


        else {

            interpretation.innerHTML = `

                <strong>

                    Dominan:
                    ${dominant.label}

                    (${dominant.percentage.toLocaleString(
                        "id-ID",
                        {
                            minimumFractionDigits:
                                1,

                            maximumFractionDigits:
                                1
                        }
                    )}%)

                </strong>

                <br><br>

                ${getSedimentInterpretation(
                    dominant.label
                )}

            `;

        }

    }

}



// =========================================================
// 24. PERBANDINGAN TIGA PERIODE
// =========================================================

function updateSedimentPeriodComparison() {


    const targetIds = [

        "sedPeriodText1",

        "sedPeriodText2",

        "sedPeriodText3"

    ];



    SEDIMENT_PERIODS
        .forEach(

            function(
                period,
                index
            ) {


                const element =
                    document.getElementById(
                        targetIds[index]
                    );


                if (!element) {

                    return;

                }



                const summary =
                    calculateSedimentSummary(
                        period,
                        "ALL"
                    );



                const dominant =
                    getSedimentDominantRow(
                        summary
                    );



                if (
                    !dominant ||
                    dominant.count === 0
                ) {

                    element.textContent =
                        "Data periode ini belum terbaca dari ANALISIS_SEDIMEN.geojson.";

                    return;

                }



                const periodLabel =
                    period.replace("-", "–");


                // =================================================
                // HITUNG DOMINAN PER SEL
                // =================================================

                const west =
                    getSedimentDominantRow(

                        calculateSedimentSummary(
                            period,
                            "BARAT"
                        )

                    );


                const central =
                    getSedimentDominantRow(

                        calculateSedimentSummary(
                            period,
                            "TENGAH"
                        )

                    );


                const east =
                    getSedimentDominantRow(

                        calculateSedimentSummary(
                            period,
                            "TIMUR"
                        )

                    );



                function cellLine(
                    name,
                    row
                ) {

                    if (
                        !row ||
                        row.count === 0
                    ) {

                        return `
                            <div
                                style="
                                    display:flex;
                                    justify-content:space-between;
                                    gap:10px;
                                    padding:5px 0;
                                    border-bottom:1px solid #e5eae8;
                                "
                            >

                                <span>
                                    ${name}
                                </span>

                                <strong>
                                    —
                                </strong>

                            </div>
                        `;

                    }


                    return `

                        <div
                            style="
                                display:flex;
                                justify-content:space-between;
                                gap:10px;
                                padding:5px 0;
                                border-bottom:1px solid #e5eae8;
                            "
                        >

                            <span>
                                ${name}
                            </span>

                            <strong>
                                ${row.label}
                                ·
                                ${row.percentage.toLocaleString(
                                    "id-ID",
                                    {
                                        minimumFractionDigits: 1,
                                        maximumFractionDigits: 1
                                    }
                                )}%
                            </strong>

                        </div>

                    `;

                }



                element.innerHTML = `

                    <div
                        style="
                            margin-bottom:12px;
                        "
                    >

                        Kelas dominan seluruh pesisir:

                        <strong>
                            ${dominant.label}
                        </strong>

                        sebesar

                        <strong>
                            ${dominant.percentage.toLocaleString(
                                "id-ID",
                                {
                                    minimumFractionDigits:
                                        1,

                                    maximumFractionDigits:
                                        1
                                }
                            )}%
                        </strong>

                        dari

                        ${summary.valid.toLocaleString("id-ID")}

                        data valid.

                    </div>


                    <div
                        style="
                            margin-top:8px;
                            font-size:11px;
                            line-height:1.5;
                        "
                    >

                        ${cellLine(
                            "Sel Barat",
                            west
                        )}

                        ${cellLine(
                            "Sel Tengah",
                            central
                        )}

                        ${cellLine(
                            "Sel Timur",
                            east
                        )}

                    </div>

                `;

            }

        );

}



// =========================================================
// 25. FIT MAP SESUAI FILTER
// =========================================================

function fitSedimentSelection() {

    if (!sedimentMap) {
        return;
    }


    const features =
        sedimentFeaturesFiltered();


    if (!features.length) {
        return;
    }


    const bounds =
        new maplibregl
            .LngLatBounds();


    features.forEach(

        function(feature) {

            if (
                feature
                    ?.geometry
                    ?.coordinates
            ) {

                extendBoundsRecursive(

                    bounds,

                    feature
                        .geometry
                        .coordinates

                );

            }

        }

    );


    if (
        !bounds.isEmpty()
    ) {

        sedimentMap.fitBounds(

            bounds,

            {
                padding:
                    55,

                maxZoom:
                    13.5,

                duration:
                    550
            }

        );

    }

}



// =========================================================
// 26. UPDATE FILTER MAP
// =========================================================

function updateSedimentMapFilter() {

    if (!sedimentMap) {
        return;
    }


    const filter =
        getSedimentMapFilter();



    [
        "sediment-lines",
        "sediment-points"
    ]
        .forEach(

            function(layerId) {

                if (
                    sedimentMap.getLayer(
                        layerId
                    )
                ) {

                    sedimentMap.setFilter(
                        layerId,
                        filter
                    );

                }

            }

        );



    // =====================================================
    // HIGHLIGHT SEL AKTIF
    // =====================================================

    if (
        sedimentMap.getLayer(
            "sediment-cell-fill"
        )
    ) {

        sedimentMap
            .setPaintProperty(

                "sediment-cell-fill",

                "fill-opacity",

                sedimentActiveCell ===
                "ALL"

                ?

                0.045

                :

                [

                    "case",

                    [
                        "==",

                        [
                            "get",
                            "__SEL_CODE"
                        ],

                        sedimentActiveCell
                    ],

                    0.14,

                    0.02

                ]

            );

    }



    if (
        sedimentMap.getLayer(
            "sediment-cell-outline"
        )
    ) {

        sedimentMap
            .setPaintProperty(

                "sediment-cell-outline",

                "line-width",

                sedimentActiveCell ===
                "ALL"

                ?

                2

                :

                [

                    "case",

                    [
                        "==",

                        [
                            "get",
                            "__SEL_CODE"
                        ],

                        sedimentActiveCell
                    ],

                    4,

                    1.5

                ]

            );

    }


    fitSedimentSelection();

}



// =========================================================
// 27. PILIH PERIODE
// =========================================================

function setSedimentPeriod(
    period
) {

    if (
        !SEDIMENT_PERIODS
            .includes(period)
    ) {

        return;

    }


    sedimentActivePeriod =
        period;



    document
        .querySelectorAll(
            ".sed-period-btn[data-period]"
        )
        .forEach(

            function(button) {

                button
                    .classList
                    .toggle(

                        "active",

                        button.getAttribute(
                            "data-period"
                        )
                        ===
                        period

                    );

            }

        );



    if (sedimentPopup) {

        sedimentPopup.remove();

        sedimentPopup =
            null;

    }


    updateSedimentMapFilter();

    renderSedimentSummary();

}



// =========================================================
// 28. PILIH SEL
// =========================================================

function setSedimentCell(
    cell
) {

    if (
        ![
            "ALL",
            "BARAT",
            "TENGAH",
            "TIMUR"
        ].includes(cell)
    ) {

        return;

    }


    sedimentActiveCell =
        cell;



    document
        .querySelectorAll(
            ".sed-cell-btn[data-cell]"
        )
        .forEach(

            function(button) {

                button
                    .classList
                    .toggle(

                        "active",

                        button.getAttribute(
                            "data-cell"
                        )
                        ===
                        cell

                    );

            }

        );



    if (sedimentPopup) {

        sedimentPopup.remove();

        sedimentPopup =
            null;

    }


    updateSedimentMapFilter();

    renderSedimentSummary();

}



// =========================================================
// 29. BUTTON PERIODE + SEL
// =========================================================

function initSedimentControls() {


    document
        .querySelectorAll(
            ".sed-period-btn[data-period]"
        )
        .forEach(

            function(button) {

                button.addEventListener(

                    "click",

                    function() {

                        setSedimentPeriod(

                            button.getAttribute(
                                "data-period"
                            )

                        );

                    }

                );

            }

        );



    document
        .querySelectorAll(
            ".sed-cell-btn[data-cell]"
        )
        .forEach(

            function(button) {

                button.addEventListener(

                    "click",

                    function() {

                        setSedimentCell(

                            button.getAttribute(
                                "data-cell"
                            )

                        );

                    }

                );

            }

        );

}



// =========================================================
// 30. HELPER NILAI ATRIBUT
// =========================================================

function sedimentValue(
    props,
    field
) {

    if (!field) {
        return null;
    }


    const value =
        props?.[field];


    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {

        return null;

    }


    return value;

}



// =========================================================
// 31. FORMAT NILAI
// =========================================================

function sedimentFormatted(

    value,

    digits = 2,

    suffix = ""

) {

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {

        return "-";

    }


    const number =
        Number(value);


    if (
        Number.isFinite(number)
    ) {

        return (

            formatNumber(
                number,
                digits
            )

            +

            suffix

        );

    }


    return (
        String(value)
        +
        suffix
    );

}



// =========================================================
// 32. STATUS TSS
// =========================================================

function sedimentTssStatus(props) {


    const explicit =
        sedimentValue(

            props,

            sedimentResolvedFields
                .tssStatus

        );


    if (
        explicit !== null
    ) {


        const numeric =
            Number(explicit);


        if (
            Number.isFinite(numeric)
        ) {


            const tss =
                Number(

                    sedimentValue(

                        props,

                        sedimentResolvedFields
                            .tss

                    )

                );


            if (
                Number.isFinite(tss)
            ) {

                return (
                    tss >= numeric

                    ?

                    `Di atas ambang ${formatNumber(numeric,1)} mg/L`

                    :

                    `Di bawah ambang ${formatNumber(numeric,1)} mg/L`
                );

            }


            return (
                formatNumber(
                    numeric,
                    1
                )
                +
                " mg/L"
            );

        }


        return explicit;

    }



    const tss =
        Number(

            sedimentValue(

                props,

                sedimentResolvedFields
                    .tss

            )

        );


    if (
        !Number.isFinite(tss)
    ) {

        return "-";

    }


    return (

        tss >= 30.4

        ?

        "Di atas ambang 30,4 mg/L"

        :

        "Di bawah ambang 30,4 mg/L"

    );

}



// =========================================================
// 33. POPUP TRANSEK
// =========================================================

function showSedimentPopup(
    event,
    feature
) {

    const props =
        feature.properties ||
        {};


    const className =
        props.__SED_CLASS ||
        "-";


    const transect =
        props.__SED_TRANSECT ||
        "-";


    const period =

        props.__SED_PERIOD

        ?

        props
            .__SED_PERIOD
            .replace(
                "-",
                "–"
            )

        :

        "-";


    const cell =
        sedimentCellDisplay(
            props.__SED_CELL
        );



    const tss =
        sedimentValue(

            props,

            sedimentResolvedFields
                .tss

        );


    const hs =
        sedimentValue(

            props,

            sedimentResolvedFields
                .hs

        );


    const mwd =
        sedimentValue(

            props,

            sedimentResolvedFields
                .mwd

        );


    const mwp =
        sedimentValue(

            props,

            sedimentResolvedFields
                .mwp

        );


    const distance =
        sedimentValue(

            props,

            sedimentResolvedFields
                .distanceMouth

        );


    const shoreline =
        sedimentValue(

            props,

            sedimentResolvedFields
                .shoreline

        );


    const respon =
        sedimentValue(

            props,

            sedimentResolvedFields
                .respon

        );


    const namaSungai =
        sedimentValue(

            props,

            sedimentResolvedFields
                .namaSungai

        );


    const muaraId =
        sedimentValue(

            props,

            sedimentResolvedFields
                .muaraId

        );



    const html = `

        <div class="sediment-popup">


            <div class="sediment-popup-header">

                <span>
                    PROKSI NERACA SEDIMEN
                </span>

                <strong>
                    ${transect}
                </strong>

            </div>


            <div class="sediment-popup-body">


                <div class="popup-row">

                    <span>
                        Periode
                    </span>

                    <b>
                        ${period}
                    </b>

                </div>


                <div class="popup-row">

                    <span>
                        Sel
                    </span>

                    <b>
                        ${cell}
                    </b>

                </div>


                <div class="popup-row">

                    <span>
                        Kelas Proksi
                    </span>

                    <b>
                        ${className}
                    </b>

                </div>


                <div class="popup-row">

                    <span>
                        Respon Shoreline
                    </span>

                    <b>
                        ${respon ?? "-"}
                    </b>

                </div>


                <div class="popup-row">

                    <span>
                        D Median
                    </span>

                    <b>

                        ${sedimentFormatted(
                            shoreline,
                            2
                        )}

                    </b>

                </div>


                <div class="popup-row">

                    <span>
                        TSS Median
                    </span>

                    <b>

                        ${sedimentFormatted(
                            tss,
                            2,
                            " mg/L"
                        )}

                    </b>

                </div>


                <div class="popup-row">

                    <span>
                        Status TSS
                    </span>

                    <b>
                        ${sedimentTssStatus(
                            props
                        )}
                    </b>

                </div>


                <div class="popup-row">

                    <span>
                        Hs
                    </span>

                    <b>

                        ${sedimentFormatted(
                            hs,
                            3,
                            " m"
                        )}

                    </b>

                </div>


                <div class="popup-row">

                    <span>
                        MWP
                    </span>

                    <b>

                        ${sedimentFormatted(
                            mwp,
                            3,
                            " s"
                        )}

                    </b>

                </div>


                <div class="popup-row">

                    <span>
                        MWD
                    </span>

                    <b>

                        ${sedimentFormatted(
                            mwd,
                            2,
                            "°"
                        )}

                    </b>

                </div>


                <div class="popup-row">

                    <span>
                        Jarak Muara
                    </span>

                    <b>

                        ${sedimentFormatted(
                            distance,
                            2,
                            " m"
                        )}

                    </b>

                </div>


                <div class="popup-row">

                    <span>
                        Nama Sungai
                    </span>

                    <b>
                        ${namaSungai ?? "-"}
                    </b>

                </div>


                <div class="popup-row">

                    <span>
                        Muara ID
                    </span>

                    <b>
                        ${muaraId ?? "-"}
                    </b>

                </div>


                <div
                    style="
                        margin-top:12px;
                        padding-top:10px;
                        border-top:2px solid
                        ${SEDIMENT_CLASS_COLORS[className] || "#177f7b"};
                    "
                >


                    <div
                        style="
                            margin-bottom:5px;
                            font-size:8px;
                            font-weight:700;
                            letter-spacing:1.5px;
                            color:#177f7b;
                        "
                    >

                        INTERPRETASI

                    </div>


                    <div
                        style="
                            font-size:11px;
                            line-height:1.6;
                            color:#405961;
                        "
                    >

                        ${getSedimentInterpretation(
                            className
                        )}

                    </div>


                </div>


            </div>


        </div>

    `;



    if (sedimentPopup) {

        sedimentPopup.remove();

    }



    sedimentPopup =

        new maplibregl.Popup({

            closeButton:
                true,

            closeOnClick:
                true,

            maxWidth:
                "380px"

        })

            .setLngLat(
                event.lngLat
            )

            .setHTML(
                html
            )

            .addTo(
                sedimentMap
            );

}



// =========================================================
// 34. EVENT FEATURE
// =========================================================

function handleSedimentFeatureClick(
    event
) {

    if (
        !event.features ||
        !event.features.length
    ) {

        return;

    }


    showSedimentPopup(

        event,

        event.features[0]

    );

}



// =========================================================
// 35. INIT MAP SEDIMEN
// =========================================================

function initSedimentMap() {


    if (
        sedimentMapInitialized
    ) {

        return;

    }


    const container =
        document.getElementById(
            "sedimentMap"
        );


    if (
        !container ||
        typeof maplibregl ===
        "undefined"
    ) {

        return;

    }


    sedimentMapInitialized =
        true;



    sedimentMap =
        new maplibregl.Map({


            container:
                "sedimentMap",


            style:
                makeOsmStyle(
                    "osm-sediment"
                ),


            center: [

                109.13,

                -6.845

            ],


            zoom:
                11


        });



    sedimentMap.addControl(

        new maplibregl
            .NavigationControl(),

        "top-right"

    );



    sedimentMap.on(

        "load",

        async function() {


            try {


                // =========================================
                // LOAD DATA
                // =========================================

                const results =
                    await Promise.all([

                        loadSedimentGeoJSON(),

                        loadSedimentCellGeoJSON()

                    ]);



                sedimentGeoJSON =
                    results[0];


                sedimentCellGeoJSON =
                    results[1];



                // =========================================
                // DETEKSI ATRIBUT
                // =========================================

                resolveSedimentFields(

                    sedimentGeoJSON
                        .features

                );



                // =========================================
                // TAMBAHKAN FIELD INTERNAL
                // =========================================

                assignSedimentDerivedProperties();



                console.log(

                    "TOTAL FEATURE ANALISIS_SEDIMEN:",

                    sedimentGeoJSON
                        .features
                        .length

                );


                console.log(

                    "CONTOH ATRIBUT ANALISIS_SEDIMEN:",

                    sedimentGeoJSON
                        .features[0]
                        ?.properties
                    ||
                    {}

                );



                // =================================================
                // DEBUG NILAI PROKSI
                // =================================================

                console.log(

                    "CONTOH KELAS PROKSI:",

                    sedimentGeoJSON
                        .features
                        .slice(0,20)
                        .map(
                            function(feature) {

                                return feature
                                    .properties
                                    .__SED_CLASS;

                            }
                        )

                );


                console.log(

                    "CONTOH PERIODE:",

                    sedimentGeoJSON
                        .features
                        .slice(0,20)
                        .map(
                            function(feature) {

                                return feature
                                    .properties
                                    .__SED_PERIOD;

                            }
                        )

                );


                console.log(

                    "CONTOH SEL:",

                    sedimentGeoJSON
                        .features
                        .slice(0,20)
                        .map(
                            function(feature) {

                                return feature
                                    .properties
                                    .__SED_CELL;

                            }
                        )

                );



                // =================================================
                // SOURCE SEL
                // =================================================

                sedimentMap.addSource(

                    "sediment-cells",

                    {

                        type:
                            "geojson",

                        data:
                            sedimentCellGeoJSON

                    }

                );



                // =================================================
                // FILL SEL
                // =================================================

                sedimentMap.addLayer({


                    id:
                        "sediment-cell-fill",


                    type:
                        "fill",


                    source:
                        "sediment-cells",


                    paint: {


                        "fill-color":
                            "#177f7b",


                        "fill-opacity":
                            0.045


                    }


                });



                // =================================================
                // OUTLINE SEL
                // =================================================

                sedimentMap.addLayer({


                    id:
                        "sediment-cell-outline",


                    type:
                        "line",


                    source:
                        "sediment-cells",


                    paint: {


                        "line-color":
                            "#123746",


                        "line-width":
                            2,


                        "line-opacity":
                            0.78,


                        "line-dasharray":
                            [
                                4,
                                2
                            ]


                    }


                });



                // =================================================
                // LABEL SEL
                // =================================================

                sedimentMap.addLayer({


                    id:
                        "sediment-cell-label",


                    type:
                        "symbol",


                    source:
                        "sediment-cells",


                    layout: {


                        "text-field":
                            [
                                "get",
                                "__SEL_LABEL"
                            ],


                        "text-size":
                            13,


                        "text-anchor":
                            "center",


                        "text-allow-overlap":
                            false


                    },


                    paint: {


                        "text-color":
                            "#123746",


                        "text-halo-color":
                            "rgba(255,255,255,0.95)",


                        "text-halo-width":
                            2


                    }


                });



                // =================================================
                // SOURCE ANALISIS SEDIMEN
                // =================================================

                sedimentMap.addSource(

                    "sediment-data",

                    {

                        type:
                            "geojson",

                        data:
                            sedimentGeoJSON

                    }

                );



                // =================================================
                // GARIS
                // =================================================

                sedimentMap.addLayer({


                    id:
                        "sediment-lines",


                    type:
                        "line",


                    source:
                        "sediment-data",


                    filter:
                        getSedimentMapFilter(),


                    layout: {


                        "line-cap":
                            "round",


                        "line-join":
                            "round"


                    },


                    paint: {


                        "line-width": [

                            "interpolate",

                            ["linear"],

                            ["zoom"],

                            10,
                            4,

                            13,
                            7

                        ],


                        "line-opacity":
                            0.98,


                        "line-color": [


                            "match",


                            [
                                "get",
                                "__SED_CLASS"
                            ],


                            "Surplus / Deposisi",
                            SEDIMENT_CLASS_COLORS[
                                "Surplus / Deposisi"
                            ],


                            "Deposisi Lokal",
                            SEDIMENT_CLASS_COLORS[
                                "Deposisi Lokal"
                            ],


                            "Relatif Seimbang",
                            SEDIMENT_CLASS_COLORS[
                                "Relatif Seimbang"
                            ],


                            "Bypass / Export",
                            SEDIMENT_CLASS_COLORS[
                                "Bypass / Export"
                            ],


                            "Defisit / Erosi",
                            SEDIMENT_CLASS_COLORS[
                                "Defisit / Erosi"
                            ],


                            "#7a8587"


                        ]


                    }


                });



                // =================================================
                // POINT
                // Data Anda dari screenshot tampaknya berupa titik,
                // jadi layer ini penting.
                // =================================================

                sedimentMap.addLayer({


                    id:
                        "sediment-points",


                    type:
                        "circle",


                    source:
                        "sediment-data",


                    filter:
                        getSedimentMapFilter(),


                    paint: {


                        "circle-radius": [

                            "interpolate",

                            ["linear"],

                            ["zoom"],

                            10,
                            4,

                            13,
                            7

                        ],


                        "circle-stroke-color":
                            "#ffffff",


                        "circle-stroke-width":
                            1.3,


                        "circle-opacity":
                            0.98,


                        "circle-color": [


                            "match",


                            [
                                "get",
                                "__SED_CLASS"
                            ],


                            "Surplus / Deposisi",
                            SEDIMENT_CLASS_COLORS[
                                "Surplus / Deposisi"
                            ],


                            "Deposisi Lokal",
                            SEDIMENT_CLASS_COLORS[
                                "Deposisi Lokal"
                            ],


                            "Relatif Seimbang",
                            SEDIMENT_CLASS_COLORS[
                                "Relatif Seimbang"
                            ],


                            "Bypass / Export",
                            SEDIMENT_CLASS_COLORS[
                                "Bypass / Export"
                            ],


                            "Defisit / Erosi",
                            SEDIMENT_CLASS_COLORS[
                                "Defisit / Erosi"
                            ],


                            "#7a8587"


                        ]


                    }


                });



                // =================================================
                // EVENT GARIS + POINT
                // =================================================

                [
                    "sediment-lines",
                    "sediment-points"
                ]
                    .forEach(

                        function(layerId) {


                            sedimentMap.on(

                                "click",

                                layerId,

                                handleSedimentFeatureClick

                            );



                            sedimentMap.on(

                                "mouseenter",

                                layerId,

                                function() {

                                    sedimentMap
                                        .getCanvas()
                                        .style
                                        .cursor =
                                        "pointer";

                                }

                            );



                            sedimentMap.on(

                                "mouseleave",

                                layerId,

                                function() {

                                    sedimentMap
                                        .getCanvas()
                                        .style
                                        .cursor =
                                        "";

                                }

                            );

                        }

                    );



                // =================================================
                // KLIK POLYGON SEL
                // =================================================

                sedimentMap.on(

                    "click",

                    "sediment-cell-fill",

                    function(event) {


                        if (
                            !event.features ||
                            !event.features.length
                        ) {

                            return;

                        }


                        const cell =
                            event
                                .features[0]
                                .properties
                                ?.__SEL_CODE;


                        if (
                            [
                                "BARAT",
                                "TENGAH",
                                "TIMUR"
                            ].includes(cell)
                        ) {

                            setSedimentCell(
                                cell
                            );

                        }

                    }

                );



                // =================================================
                // DEFAULT
                // =================================================

                updateSedimentMapFilter();

                renderSedimentSummary();

                updateSedimentPeriodComparison();



                setTimeout(

                    function() {

                        sedimentMap.resize();

                    },

                    250

                );


            }


            catch(error) {


                console.error(
                    "ERROR SEDIMEN:",
                    error
                );



                container.innerHTML = `

                    <div
                        style="
                            height:100%;
                            min-height:550px;
                            display:flex;
                            align-items:center;
                            justify-content:center;
                            padding:30px;
                            text-align:center;
                            background:#eef1ef;
                            color:#8a3030;
                        "
                    >

                        <div>

                            <strong>
                                Peta Proksi Sedimen gagal dimuat
                            </strong>

                            <br><br>

                            Pastikan file tersedia:

                            <br><br>

                            Data/ANALISIS_SEDIMEN.geojson

                            <br>

                            Data/PEMBAGIAN_SEL.geojson

                            <br><br>

                            Periksa F12 → Console.

                        </div>

                    </div>

                `;


            }


        }

    );

}



// =========================================================
// 36. RESIZE MAP SEDIMEN
// =========================================================

function initSedimentResizeObserver() {


    const section =
        document.getElementById(
            "hasil-sedimen"
        );


    if (!section) {
        return;
    }



    const observer =
        new IntersectionObserver(

            function(entries) {


                entries.forEach(

                    function(entry) {


                        if (
                            !entry.isIntersecting
                        ) {

                            return;

                        }


                        if (sedimentMap) {


                            setTimeout(

                                function() {

                                    sedimentMap.resize();

                                },

                                180

                            );


                        }

                    }

                );


            },

            {
                threshold:
                    0.05
            }

        );


    observer.observe(
        section
    );

}



// =========================================================
// 37. INIT PROKSI SEDIMEN
// =========================================================

window.addEventListener(

    "DOMContentLoaded",

    function() {


        try {


            initSedimentControls();

            initSedimentMap();

            initSedimentResizeObserver();


        }


        catch(error) {


            console.error(
                "ERROR INIT SEDIMEN:",
                error
            );


        }


    }

)
// =========================================================
// RANDOM FOREST MAP
// SHORELINE 2025 vs PREDIKSI 2035
// =========================================================

let rfMap = null;


function initRfMap() {

    const container =
        document.getElementById("rfMap");


    if (!container) {

        console.warn(
            "rfMap container tidak ditemukan."
        );

        return;

    }


    // Hindari inisialisasi ganda

    if (rfMap) {

        try {
            rfMap.remove();
        }
        catch (e) {}

        rfMap = null;

    }



    // =====================================================
    // BUAT MAP
    // =====================================================

    rfMap =
        new maplibregl.Map({

            container:
                "rfMap",

            center: [
                109.125,
                -6.85
            ],

            zoom:
                11.2,


            // =============================================
            // STYLE OSM LANGSUNG
            // Tidak memakai makeOsmStyle()
            // =============================================

            style: {

                version: 8,

                sources: {

                    osm: {

                        type:
                            "raster",

                        tiles: [

                            "https://tile.openstreetmap.org/{z}/{x}/{y}.png"

                        ],

                        tileSize:
                            256,

                        attribution:
                            "© OpenStreetMap contributors"

                    }

                },


                layers: [

                    {

                        id:
                            "osm-basemap",

                        type:
                            "raster",

                        source:
                            "osm",

                        minzoom:
                            0,

                        maxzoom:
                            19

                    }

                ]

            }

        });



    // =====================================================
    // CONTROL
    // =====================================================

    rfMap.addControl(

        new maplibregl.NavigationControl({

            showCompass:
                false

        }),

        "top-right"

    );



    // =====================================================
    // ERROR MAP
    // =====================================================

    rfMap.on(
        "error",
        function(event) {

            console.error(
                "RF MAPLIBRE ERROR:",
                event.error
            );

        }
    );



    // =====================================================
    // SETELAH BASEMAP SELESAI
    // =====================================================

    rfMap.on(
        "load",
        async function() {

            console.log(
                "RF basemap berhasil dimuat."
            );


            // Paksa resize setelah section terbentuk

            setTimeout(
                function() {

                    rfMap.resize();

                },
                300
            );


            try {


                // =========================================
                // 1. GARIS PANTAI 2025
                // =========================================

                const response2025 =
                    await fetch(
                        "Data/SHORELINE_2025.geojson"
                    );


                if (!response2025.ok) {

                    throw new Error(
                        "SHORELINE_2025.geojson tidak ditemukan. HTTP " +
                        response2025.status
                    );

                }


                const shoreline2025 =
                    await response2025.json();


                console.log(
                    "Shoreline 2025:",
                    shoreline2025
                );



                // =========================================
                // 2. PREDIKSI 2035
                // =========================================

                const response2035 =
                    await fetch(
                        "Data/PREDIKSI_SHORELINE_2035.geojson"
                    );


                if (!response2035.ok) {

                    throw new Error(
                        "PREDIKSI_SHORELINE_2035.geojson tidak ditemukan. HTTP " +
                        response2035.status
                    );

                }


                const shoreline2035 =
                    await response2035.json();


                console.log(
                    "Prediksi 2035:",
                    shoreline2035
                );



                // =========================================
                // SOURCE 2025
                // =========================================

                rfMap.addSource(
                    "rf-shoreline-2025",
                    {

                        type:
                            "geojson",

                        data:
                            shoreline2025

                    }
                );



                rfMap.addLayer({

                    id:
                        "rf-shoreline-2025-line",

                    type:
                        "line",

                    source:
                        "rf-shoreline-2025",

                    layout: {

                        "line-join":
                            "round",

                        "line-cap":
                            "round"

                    },

                    paint: {

                        "line-color":
                            "#2166ac",

                        "line-width":
                            4,

                        "line-opacity":
                            0.95

                    }

                });



                // =========================================
                // SOURCE PREDIKSI 2035
                // =========================================

                rfMap.addSource(
                    "rf-shoreline-2035",
                    {

                        type:
                            "geojson",

                        data:
                            shoreline2035

                    }
                );



                rfMap.addLayer({

                    id:
                        "rf-shoreline-2035-line",

                    type:
                        "line",

                    source:
                        "rf-shoreline-2035",

                    layout: {

                        "line-join":
                            "round",

                        "line-cap":
                            "round"

                    },

                    paint: {

                        "line-color":
                            "#d73027",

                        "line-width":
                            4,

                        "line-opacity":
                            0.95

                    }

                });



                // =========================================
                // HITUNG BOUNDS DARI KEDUA GEOJSON
                // =========================================

                const bounds =
                    new maplibregl
                        .LngLatBounds();


                function addCoordinates(
                    coordinates
                ) {

                    if (!coordinates) {
                        return;
                    }


                    // titik koordinat [lng, lat]

                    if (
                        typeof coordinates[0] ===
                            "number" &&
                        typeof coordinates[1] ===
                            "number"
                    ) {

                        bounds.extend(
                            coordinates
                        );

                        return;

                    }


                    coordinates.forEach(
                        addCoordinates
                    );

                }



                shoreline2025.features
                    .forEach(
                        function(feature) {

                            if (
                                feature.geometry &&
                                feature.geometry.coordinates
                            ) {

                                addCoordinates(
                                    feature.geometry.coordinates
                                );

                            }

                        }
                    );



                shoreline2035.features
                    .forEach(
                        function(feature) {

                            if (
                                feature.geometry &&
                                feature.geometry.coordinates
                            ) {

                                addCoordinates(
                                    feature.geometry.coordinates
                                );

                            }

                        }
                    );



                if (!bounds.isEmpty()) {

                    rfMap.fitBounds(

                        bounds,

                        {

                            padding: {

                                top:
                                    55,

                                right:
                                    55,

                                bottom:
                                    55,

                                left:
                                    55

                            },

                            maxZoom:
                                15,

                            duration:
                                1000

                        }

                    );

                }



                // =========================================
                // POPUP GARIS 2035
                // =========================================

                rfMap.on(
                    "click",
                    "rf-shoreline-2035-line",
                    function(event) {

                        if (
                            !event.features ||
                            !event.features.length
                        ) {

                            return;

                        }


                        const feature =
                            event.features[0];


                        const p =
                            feature.properties || {};


                        const id =
                            p.ID_TRANSEK ??
                            p.TRANSEK ??
                            p.TransectID ??
                            p.ID ??
                            "-";


                        const pred =
                            p.PRED_M ??
                            p.DELTA_M ??
                            p.PREDIKSI ??
                            p.PRED_2035 ??
                            "-";


                        const kategori =
                            p.KELAS ??
                            p.KATEGORI ??
                            p.CLASS ??
                            "-";


                        const html =
                            `

                            <div class="dsas-popup">

                                <div class="dsas-popup-header">

                                    <span>
                                        PREDIKSI GARIS PANTAI 2035
                                    </span>

                                    <strong>
                                        Transek ${id}
                                    </strong>

                                </div>


                                <div class="dsas-popup-body">

                                    <div class="popup-row">

                                        <span>
                                            Pergeseran
                                        </span>

                                        <b>
                                            ${pred} m
                                        </b>

                                    </div>


                                    <div class="popup-row">

                                        <span>
                                            Kategori
                                        </span>

                                        <b>
                                            ${kategori}
                                        </b>

                                    </div>

                                </div>

                            </div>

                            `;



                        new maplibregl.Popup({

                            closeButton:
                                true,

                            closeOnClick:
                                true,

                            maxWidth:
                                "300px"

                        })

                        .setLngLat(
                            event.lngLat
                        )

                        .setHTML(
                            html
                        )

                        .addTo(
                            rfMap
                        );

                    }
                );



                // =========================================
                // CURSOR
                // =========================================

                rfMap.on(
                    "mouseenter",
                    "rf-shoreline-2035-line",
                    function() {

                        rfMap
                            .getCanvas()
                            .style
                            .cursor =
                            "pointer";

                    }
                );


                rfMap.on(
                    "mouseleave",
                    "rf-shoreline-2035-line",
                    function() {

                        rfMap
                            .getCanvas()
                            .style
                            .cursor =
                            "";

                    }
                );



                console.log(
                    "RF shoreline 2025 dan 2035 berhasil ditampilkan."
                );


            }

            catch(error) {

                console.error(
                    "RF GEOJSON ERROR:",
                    error
                );

            }

        }
    );

}