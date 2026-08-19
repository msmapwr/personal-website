/* ===================================
   Msmapwr Personal Website
   Fluent Design System
=================================== */


/* ---------- Fluent Tokens ---------- */


:root {

    --primary: #0078d4;
    --secondary: #106ebe;

    --accent-yellow: #ffb900;

    --background:
        #f3f2f1;

    --surface:
        rgba(255,255,255,0.72);

    --surface-solid:
        #ffffff;

    --text:
        #323130;

    --text-secondary:
        #605e5c;

    --border:
        #e1e1e1;


    --shadow-small:
        0 1.6px 3.6px rgba(0,0,0,.13),
        0 .3px .9px rgba(0,0,0,.1);


    --shadow-medium:
        0 3.2px 7.2px rgba(0,0,0,.13),
        0 .6px 1.8px rgba(0,0,0,.1);


    --shadow-hover:
        0 6.4px 14.4px rgba(0,0,0,.18),
        0 1.2px 3.6px rgba(0,0,0,.14);


    --radius:
        12px;

}



/* ---------- Dark Mode ---------- */


body.dark {

    --background:
        #202020;


    --surface:
        rgba(32,32,32,.75);


    --surface-solid:
        #292929;


    --text:
        #ffffff;


    --text-secondary:
        #d2d2d2;


    --border:
        rgba(255,255,255,.15);

}






/* ---------- Reset ---------- */


* {

    box-sizing:
        border-box;

}



html {

    scroll-behavior:
        smooth;

}



body {

    margin:
        0;


    min-height:
        100vh;


    background:
        var(--background);


    color:
        var(--text);


    font-family:
        "Segoe UI",
        SegoeUI,
        sans-serif;


    overflow-x:
        hidden;

}





a {

    color:
        inherit;


    text-decoration:
        none;

}






/* ---------- Canvas ---------- */


#fluent-light {

    position:
        fixed;


    inset:
        0;


    z-index:
        -1;


    pointer-events:
        none;

}








/* ---------- Acrylic ---------- */


.acrylic {


    background:
        var(--surface);


    backdrop-filter:
        blur(24px);


    -webkit-backdrop-filter:
        blur(24px);


    border:
        1px solid var(--border);


}







/* ---------- Navigation ---------- */


.navigation {


    position:
        fixed;


    top:
        16px;


    left:
        50%;


    transform:
        translateX(-50%);


    width:
        min(94%,1100px);


    z-index:
        100;


    border-radius:
        var(--radius);


    box-shadow:
        var(--shadow-small);


}



.nav-container {


    display:
        flex;


    align-items:
        center;


    justify-content:
        space-between;


    padding:
        12px 20px;


}



.brand {


    font-size:
        20px;


    font-weight:
        600;


    letter-spacing:
        -.02em;

}




.nav-links {


    display:
        flex;


    gap:
        24px;


}


.nav-links a {


    color:
        var(--text-secondary);


    transition:
        .15s ease-out;

}


.nav-links a:hover {


    color:
        var(--primary);

}







/* ---------- Buttons ---------- */


.fluent-button,
.primary-button,
.filter-button,
.project-detail {


    cursor:
        pointer;


    border:
        1px solid var(--border);


    border-radius:
        8px;


    padding:
        10px 16px;


    font-family:
        inherit;


    font-weight:
        600;


    transition:
        all .15s ease-out;


}



.fluent-button {


    background:
        transparent;


}




.primary-button {


    background:
        var(--primary);


    color:
        white;


    border:
        none;


    box-shadow:
        var(--shadow-small);


}



.primary-button:hover,
.fluent-button:hover,
.filter-button:hover,
.project-detail:hover {


    box-shadow:
        var(--shadow-hover);

}



.primary-button:active,
.fluent-button:active,
.filter-button:active,
.project-detail:active {


    transform:
        scale(.97);

}







/* ---------- Windows ---------- */


.window {


    width:
        min(1100px,92%);


    margin:
        auto;


}



.hero-window {


    min-height:
        90vh;


    display:
        flex;


    align-items:
        center;


    justify-content:
        center;


    margin-top:
        100px;


    border-radius:
        16px;


    box-shadow:
        var(--shadow-medium);


}





.hero-content {


    text-align:
        center;


    max-width:
        700px;


}







/* ---------- Avatar ---------- */


.avatar-card {


    width:
        160px;


    height:
        160px;


    margin:
        0 auto 32px;


    display:
        flex;


    align-items:
        center;


    justify-content:
        center;


    border-radius:
        50%;


    overflow:
        hidden;


    transition:
        .15s ease-out;


}



.avatar-card:hover {


    border-color:
        rgba(255,255,255,.6);


    box-shadow:
        var(--shadow-hover);

}



.avatar-card img {


    width:
        90px;


    height:
        90px;


    object-fit:
        contain;

}





/* ---------- Hero ---------- */


h1 {


    font-size:
        clamp(42px,8vw,72px);


    margin:
        0;


    font-weight:
        600;


    letter-spacing:
        -.04em;

}



.hero-title {


    font-size:
        24px;


    margin:
        20px 0;


}



.hero-description {


    color:
        var(--text-secondary);


}





.technology-tags {


    display:
        flex;


    justify-content:
        center;


    flex-wrap:
        wrap;


    gap:
        10px;


    margin:
        28px 0;

}



.technology-tags span {


    padding:
        8px 14px;


    border-radius:
        999px;


    background:
        var(--surface-solid);


    border:
        1px solid var(--border);

}









/* ---------- Sections ---------- */


.section-window {


    padding-top:
        80px;


}



.section-window h2 {


    font-size:
        32px;


    margin-bottom:
        24px;

}







.panel {


    padding:
        24px;


    border-radius:
        var(--radius);


    box-shadow:
        var(--shadow-small);

}







/* ---------- Skills ---------- */


.skill-grid {


    display:
        grid;


    grid-template-columns:
        repeat(auto-fit,minmax(220px,1fr));


    gap:
        16px;

}




.skill-tile {


    padding:
        24px;


    border-radius:
        var(--radius);


    transition:
        .15s ease-out;


}



.skill-tile:hover {


    transform:
        translateY(-2px);


    box-shadow:
        var(--shadow-hover);


}







/* ---------- Projects ---------- */


.project-filter {


    display:
        flex;


    gap:
        12px;


    margin-bottom:
        24px;


}



.filter-button {


    background:
        var(--surface-solid);


}




.filter-button.active {


    background:
        var(--primary);


    color:
        white;

}





.project-list {


    display:
        grid;


    gap:
        16px;

}





.project-item {


    padding:
        24px;


    border-radius:
        var(--radius);


    transition:
        .15s ease-out;


}



.project-item:hover {


    transform:
        translateY(-2px);


    box-shadow:
        var(--shadow-hover);


}



.project-item span {


    display:
        block;


    margin:
        12px 0;


    color:
        var(--text-secondary);

}





.project-detail {


    display:
        inline-block;


    background:
        var(--primary);


    color:
        white;


}






/* ---------- Dialog ---------- */


.project-dialog {


    border:
        1px solid var(--border);


    border-radius:
        var(--radius);


    padding:
        32px;


    color:
        var(--text);


}






/* ---------- Footer ---------- */


.footer {


    text-align:
        center;


    padding:
        60px 20px;


    color:
        var(--text-secondary);

}






/* ---------- Responsive ---------- */


@media(max-width:700px){


    .nav-links {


        display:
            none;

    }



    .hero-window {


        min-height:
            80vh;

    }



    h1 {


        font-size:
            44px;

    }


}







/* ---------- Accessibility ---------- */


button:focus,
a:focus {


    outline:
        2px solid var(--primary);


    outline-offset:
        2px;

}





@media(prefers-reduced-motion:reduce){


    *,
    *::before,
    *::after {


        animation-duration:
            .01ms !important;


        transition-duration:
            .01ms !important;


        scroll-behavior:
            auto !important;

    }

}