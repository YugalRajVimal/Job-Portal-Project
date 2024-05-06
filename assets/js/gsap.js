//Nav Bar
gsap.from("#nav-list li",{
    y:-100,
    stagger:0.3
})

// Home Page 
gsap.from("#about-site .line",{
    x:-1500,
    stagger:0.3
})

gsap.from("#home-buttons button",{
    y:500,
    stagger:0.3
})

gsap.to("#home-image",{
    // x:1500,
    borderRadius:"50%",
    duration:1,
    rotate:360
})

