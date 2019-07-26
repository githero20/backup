import { TimelineMax as Timeline, Power1 } from 'gsap';
import {ForgotPasswordLink, InviteLink, LoginLink, ResetPasswordLink, SignUpLink} from "../RouteLinks/RouteLinks";

const getDashboardTimeline = (node, delay) => {
    const timeline = new Timeline({ paused: true });
    // const content = node;
    // const content = node.querySelector('.app-content');
    // const contentInner = node.querySelector('.content-wrapper');

    timeline
        .from(node, 0.3, {autoAlpha: 1, delay, ease: Power1.easeIn })
        // .from(content, 0.15, { autoAlpha: .5, ease: Power1.easeInOut })
        // .staggerFrom(contentInner, 0.15, { autoAlpha: .5,y:-10, delay: 0.15, ease: Power1.easeIn });

    return timeline;
}
const getLoginTimeline = (node, delay) => {
    const timeline = new Timeline({ paused: true });
    // const content = node;
    // const content = node;
    const contentInner = node.querySelector('.login-form');
    timeline
        .from(node, 0.3, {
            // display: 'none',
            autoAlpha: 0.5, delay, ease: Power1.easeIn })
        // .from(content, 0.3, {autoAlpha:0,ease: Power1.easeInOut })
        .staggerFrom(contentInner, 0.15, { autoAlpha: .5,y:-10, delay: 0.15, ease: Power1.easeIn });

    return timeline;
}

const getHomeTimeline = (node, delay) => {
    const timeline = new Timeline({ paused: true });
    // const texts = node.querySelectorAll('h1 > div');
    timeline.from(node, 0, {
        // display: 'none',
        autoAlpha: 0.5, delay });
        // .staggerFrom(texts, 0.375, { autoAlpha: 0, x: -25, ease: Power1.easeOut }, 0.125);
    return timeline;
};

export const play = (pathname, node, appears) => {
    let loginUrls = [LoginLink,SignUpLink,ForgotPasswordLink,InviteLink,ResetPasswordLink];
    const delay = appears ? 0 : 0.5;
    let timeline;
    if (pathname === '/' || pathname === '/faq')
        timeline = getHomeTimeline(node, delay);
    else if(loginUrls.includes(pathname))
        timeline = getLoginTimeline(node, delay);
    else
        timeline = getDashboardTimeline(node, delay);
    window.loadPromise.then(() => requestAnimationFrame(() => timeline.play()))
}

export const exit = (node) => {
    const timeline = new Timeline({ paused: true });
    timeline.to(node, 0.15, { autoAlpha: 0, ease: Power1.easeOut });
    timeline.play();
}
