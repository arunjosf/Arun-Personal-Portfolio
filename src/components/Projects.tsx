// @ts-nocheck
"use client";
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ExternalLink } from 'lucide-react';

import DecryptedText from './DecryptedText';

// ─── Stagger animation helpers ────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay }
});

// ─── Shared CSS injected once inside modal ────────────────────
const MODAL_CSS = `
  .hide-scroll::-webkit-scrollbar{display:none}
  .hide-scroll{-ms-overflow-style:none;scrollbar-width:none}
  .pm-divider{height:1px;background:var(--text-primary);opacity:.09;margin:0 5vw}
  .pm-label{font-size:.65rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;opacity:.38;margin-bottom:.3rem}
  .pm-value{font-size:.9rem;font-weight:500;line-height:1.5}
  .pm-tag{font-size:.6rem;font-weight:800;letter-spacing:.22em;text-transform:uppercase;opacity:.32;margin-bottom:1.1rem;display:block}
  .pm-h2{font-size:clamp(1.4rem,3.2vw,2.4rem);font-weight:800;letter-spacing:-.03em;line-height:1.1;margin:0 0 .9rem 0}
  .pm-body{font-size:clamp(.88rem,1.5vw,1rem);line-height:1.88;opacity:.68;margin:0}
  .pm-live-btn{display:inline-flex;align-items:center;gap:.4rem;padding:.5rem 1rem;background:var(--text-primary);color:var(--bg-color);text-decoration:none;font-size:.68rem;font-weight:800;text-transform:uppercase;letter-spacing:.11em;border:1.5px solid var(--text-primary);cursor:pointer;transition:all .2s ease;white-space:nowrap}
  .pm-live-btn:hover{opacity:.75;transform:translateY(-1px)}
  .pm-close-btn{background:transparent;color:var(--text-primary);border:1px solid rgba(150,150,150,.3);border-radius:30px;cursor:pointer;padding:.45rem 1.1rem;display:flex;align-items:center;gap:.4rem;font-size:.68rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase;transition:all .2s ease}
  .pm-close-btn:hover{background:var(--text-primary);color:var(--bg-color);border-color:var(--text-primary);transform:scale(1.02)}
  .pm-border-box{border:1px solid rgba(150,150,150,.12)}
  .pm-arch-card{padding:1.6rem 1.8rem;flex:1 1 220px;border:1px solid rgba(150,150,150,.12)}
  .pm-arch-lbl{font-size:.65rem;font-weight:800;letter-spacing:.15em;text-transform:uppercase;opacity:.36;margin-bottom:.5rem}
  .pm-arch-stack{font-size:.9rem;font-weight:700;margin-bottom:.45rem}
  .pm-arch-desc{font-size:.82rem;line-height:1.7;opacity:.58;margin:0}
  .pm-stat-num{font-size:clamp(2rem,5vw,3.8rem);font-weight:900;letter-spacing:-.04em;line-height:1}
  .pm-stat-lbl{font-size:.68rem;font-weight:700;opacity:.42;margin-top:.2rem;letter-spacing:.06em;text-transform:uppercase}
  .pm-stat-desc{font-size:.8rem;opacity:.48;margin-top:.3rem;line-height:1.5}
  .pm-next-card{display:block;width:100%;cursor:pointer;background:transparent;border:none;text-align:left;padding:0;color:var(--text-primary);text-decoration:none}
  .pm-next-card:hover .pm-next-inner{transform:scale(1.01)}
  .pm-next-inner{transition:transform .4s ease;width:100%}
  @media(max-width:768px){
    .pm-meta-grid{grid-template-columns:1fr 1fr!important}
    .pm-vision-grid{grid-template-columns:1fr!important}
    .pm-roles-grid{grid-template-columns:1fr 1fr!important}
    .pm-arch-flex{flex-direction:column!important}
    .pm-stats-grid{grid-template-columns:1fr 1fr!important}
    .pm-gallery-grid{grid-template-columns:1fr!important}
    .pm-colophon{flex-direction:column!important;align-items:flex-start!important}
    .pm-role-cell{border-right:none!important;border-bottom:1px solid rgba(150,150,150,.12)!important}
    .pm-stat-cell{border-right:none!important;border-bottom:1px solid rgba(150,150,150,.09)!important}
    .pm-modal-container{padding-top:75px!important}
    .pm-sticky-nav{top:75px!important}
  }
`;

// ─── GD1 content ─────────────────────────────────────────────
const GD1_CONTENT = {
  tag: 'GD1 · 2026 · Full-Stack Prop-Tech Platform',
  intro: "Finding secure, long-term vehicle storage or verified service centers in a chaotic urban environment shouldn't be a shot in the dark. GD1 was built to close that gap.",
  stack: ['React','Vite','Tailwind CSS','.NET Core','SQL Server','Azure Service Bus','RAG','JWT Auth'],
  meta: [
    { label:'Client', value:'GD1 (Self-initiated)' },
    { label:'Year', value:'2026' },
    { label:'Role', value:'Full-Stack Engineer' },
    { label:'Status', value:'Shipped & Live' },
    { label:'Team', value:'1 Engineer (Solo)' },
  ],
  visionTitle: 'One platform,\nmultiple roles,\nzero gaps.',
  visionBody: [
    'GD1 is not a single-user product. It is a multi-role ecosystem designed to bridge the gap between premium vehicle storage, maintenance, and vehicle owners. A Vehicle Owner searches for parking, manages their active garage inventory, books long-term storage, and tracks vehicle status in real-time. A Garage Manager lists their property, manages parking slots, approves storage requests, and oversees live lot capacity.',
    'A Service Center receives service applications and manages maintenance requests. An Admin governs the entire platform: approving property registrations, verifying service center credentials, and monitoring global operations from a central command center.',
    "If a vehicle is marked as 'Stored', the system locks its state, updating the Garage Manager's capacity and giving the Vehicle Owner real-time peace of mind. An integrated AI Assistant (Lara) acts as a universal concierge. Every transition is seamless. Nothing falls through.",
  ],
  roles: [
    { role:'Vehicle Owner', desc:'Lands on an Apple-inspired minimal dashboard. Views registered vehicles, sees Idle vs Stored status, browses verified garages, books secure slots, and tracks live booking status.' },
    { role:'Garage Manager', desc:'Dedicated portal to list facilities, define total slots, set daily and monthly pricing, and dynamically manage incoming storage bookings as vehicles arrive and leave.' },
    { role:'Service Center', desc:'Receives service applications, manages maintenance requests, and updates vehicle service statuses in real-time. Fully integrated into the partner verification flow.' },
    { role:'Admin', desc:'Global command center. Views all registered users, approves or rejects partner applications, flags suspicious activity, and maintains platform integrity.' },
  ],
  gallery: [
    ['01','Landing Page','High-conversion hero section with dynamic search and glassmorphism aesthetics.'],
    ['02','Vehicle Owner Dashboard','Minimalist, premium UI tracking Stored vs Idle vehicles with dynamic imagery mapping.'],
    ['03','Garage Search & Listing','Location-aware property cards with pricing, amenities, and capacity indicators.'],
    ['04','Property Details View','Deep-dive into garage specs, security features (CCTV, Biometrics), and booking initiation.'],
    ['05','Partner Application Flow','Frictionless onboarding for Garage and Service Center owners to list their business.'],
    ['06','Admin Verification Center','Data-dense dashboard for approving, rejecting, and tracking partner applications.'],
    ['07','AI Chatbot — Lara','Universally accessible floating concierge for instant user support and booking guidance.'],
    ['08','Live Contact & Support','Serverless Web3Forms integration for direct, real-time customer communication.'],
  ],
  arch: [
    ['Client','React · Vite · Tailwind CSS','A blazing-fast SPA with separate dashboard experiences per role. Incorporates sleek minimalist design, glassmorphism overlays, and highly responsive grid layouts.'],
    ['API','.NET Core · C# · REST · Azure Service Bus','A highly secure, scalable REST API utilizing Role-Based Access Control. Implements complex business logic for vehicle state management, and utilizes Azure Service Bus for asynchronous agreement generation.'],
    ['AI & Data','RAG · EF Core · SQL Server','SQL Server safely stores platform data. An integrated AI Assistant (Lara) utilizes Retrieval-Augmented Generation (RAG) to provide intelligent, context-aware user support.'],
  ],
  stats: [
    ['4','User Roles','Vehicle Owner, Garage, Service Center, Admin'],
    ['2+','Repositories','Clean separation of Frontend (React) and Backend (.NET)'],
    ['100%','Serverless Contact','Zero-backend dependency for user support via Web3Forms'],
    ['1','Engineer','Every layer designed, built, and shipped solo'],
  ],
  colophon: 'Full stack · Frontend, API, Database, UI/UX Design',
};

// ─── Marqelle content ─────────────────────────────────────────
const MARQELLE_CONTENT = {
  tag: 'Marqelle · 2026 · Full-Stack E-Commerce Platform',
  intro: "Building a modern e-commerce platform isn't just about listing products — it's about engineering a frictionless, high-performance shopping experience from discovery to checkout. Marqelle was built to bypass every conventional bottleneck.",
  stack: ['React','Tailwind CSS','.NET Core','Entity Framework','SQL Server','RabbitMQ','Razorpay','Cloudinary','JWT Auth'],
  meta: [
    { label:'Client', value:'Marqelle (Self-initiated)' },
    { label:'Year', value:'2026' },
    { label:'Role', value:'Full-Stack Engineer' },
    { label:'Status', value:'Shipped & Live' },
    { label:'Team', value:'1 Engineer (Solo)' },
  ],
  visionTitle: 'One platform,\npremium aesthetics,\nzero latency.',
  visionBody: [
    'Marqelle is a dual-role ecosystem designed to bridge the gap between premium online shopping and robust inventory management. A Customer browses the catalog, manages their wishlist and cart, initiates secure transactions via Razorpay, and receives instant asynchronous email verifications. An Admin governs the entire platform, managing product inventory, tracking active orders, and overseeing user accounts from a central, data-dense command center.',
    'I built both of these experiences independently, from the secure, Role-Based Access Control (RBAC) JWT authentication system to the robust .NET backend that handles complex state transitions for orders moving from "Pending" to "Shipped". Nothing was an afterthought.',
    'By integrating RabbitMQ, the system offloads long-running tasks like OTP generation and order confirmation emails to background workers. When a user registers, the API drops a message into the cloud queue and instantly returns a success response in milliseconds. The user experiences zero loading screens while a background .NET hosted service quietly processes the email. Every transaction is seamless. Nothing slows the user down.',
  ],
  roles: [
    { role:'Customer', desc:'Logs in and lands on a sleek, responsive storefront. Browses dynamic product listings, filters by categories, adds items to cart or wishlist. Checkout is frictionless via Razorpay (no friction, no redirects).' },
    { role:'Admin', desc:'A dedicated, secure portal to manage the business. Uploads new products with automated image hosting via Cloudinary, adjusts pricing, monitors stock levels, and updates order statuses dynamically as goods are shipped.' },
  ],
  gallery: [
    ['01','Premium Storefront','High-conversion product grids with dynamic search, filtering, and modern minimalist aesthetics.'],
    ['02','Dynamic Cart & Checkout','Frictionless shopping cart management leading into a highly secure Razorpay payment gateway integration.'],
    ['03','User Dashboard & Wishlist','Personalized UI for customers to track order history, manage profiles, and save favorite products.'],
    ['04','Admin Command Center','Data-dense dashboard for tracking global orders, revenue, and managing the live product catalog.'],
    ['05','Product Management Flow','Seamless admin onboarding for new inventory, utilizing Cloudinary for instant, optimized image hosting.'],
    ['06','Lightning-Fast Authentication','Role-Based Access Control (RBAC) with JWTs and decoupled email verification for zero-latency signups.'],
  ],
  arch: [
    ['Client','React · Tailwind CSS','A blazing-fast SPA with separate dashboard experiences for shoppers and admins. Incorporates modern, highly responsive grid layouts and fluid state management.'],
    ['API','.NET Core · C# · REST · RabbitMQ','A highly secure, scalable REST API utilizing RBAC. Implements complex business logic, Entity Framework ORM, and an event-driven RabbitMQ message broker for asynchronous background processing.'],
    ['Data & Deployment','EF Core · SQL Server · Vercel · Render · CloudAMQP','SQL Server safely stores users, products, and orders. Frontend is edge-deployed on Vercel. The API is hosted on Render, communicating with a CloudAMQP RabbitMQ cluster for background tasks.'],
  ],
  stats: [
    { num:'2', lbl:'User Roles', desc:'Customer and Admin, each with their own secure dashboard and permissions' },
    { num:'2+', lbl:'Repositories', desc:'Clean separation of Frontend (React) and Backend (.NET)' },
    { num:'100%', lbl:'Async Email', desc:'Zero-latency user registration powered by RabbitMQ background workers' },
    { num:'1', lbl:'Engineer', desc:'Every layer built solo' },
  ],
  colophon: 'Full stack · Frontend, API, Database, Messaging Queues, UI/UX Design',
};

// ─── ProjectModal ─────────────────────────────────────────────
const ProjectModal = ({ project, onClose, projects, currentIndex, onOpenNext }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [project.namePart1]);

  const isGD1 = project.namePart1?.includes('GRAND');
  const isMarqelle = project.namePart1?.includes('MARQELLE');
  const content = isGD1 ? GD1_CONTENT : isMarqelle ? MARQELLE_CONTENT : null;

  const nextIndex = projects ? (currentIndex + 1) % projects.length : null;
  const nextProject = projects && nextIndex !== null ? projects[nextIndex] : null;

  return (
    <motion.div
      ref={modalRef}
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 32, stiffness: 280 }}
      className="hide-scroll pm-modal-container"
      data-lenis-prevent="true"
      style={{ position:'fixed', inset:0, zIndex:9999, background:'var(--bg-color)', color:'var(--text-primary)', overflowY:'scroll', overflowX:'hidden', WebkitOverflowScrolling:'touch' }}
    >
      <style>{MODAL_CSS}</style>

      {/* ── STICKY NAV ── */}
      <div className="pm-sticky-nav" style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'.85rem 5vw', borderBottom:'1px solid rgba(150,150,150,.12)', position:'sticky', top:0, background:'var(--bg-color)', zIndex:10, backdropFilter:'blur(18px)' }}>
        <span style={{ fontSize:'.6rem', fontWeight:800, letterSpacing:'.2em', textTransform:'uppercase', opacity:.3 }}>Case Study</span>
        <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="pm-live-btn">
            View Live <ExternalLink size={10} />
          </a>
          <button onClick={onClose} className="pm-close-btn">
            <X size={14} /> Close
          </button>
        </div>
      </div>

      {/* ── HERO ── */}
      <div style={{ padding:'4.5rem 5vw 3rem' }}>
        <motion.span className="pm-tag" {...fadeUp(0.1)}>
          {content?.tag || `${project.namePart1} · Project`}
        </motion.span>
        <div style={{ overflow:'hidden' }}>
          <motion.h1
            initial={{ opacity:0, y:60 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:.7, ease:[0.25,0.46,0.45,0.94], delay:.15 }}
            style={{ fontSize:'clamp(2.6rem,9vw,7.5rem)', fontWeight:900, lineHeight:.88, letterSpacing:'-.04em', textTransform:'uppercase', margin:'0 0 1.6rem 0' }}
          >
            <DecryptedText text={project.namePart1} speed={40} maxIterations={12} sequential={true} />
            <br/>
            <span style={{ color:'transparent', WebkitTextStroke:'2px var(--text-primary)' }}>
              <DecryptedText text={project.namePart2} speed={40} maxIterations={12} sequential={true} />
            </span>
          </motion.h1>
        </div>
        <motion.p {...fadeUp(0.3)} style={{ fontSize:'clamp(.9rem,1.7vw,1.15rem)', maxWidth:'620px', lineHeight:1.78, opacity:.58, margin:0 }}>
          {content?.intro || project.description}
        </motion.p>
      </div>

      <div className="pm-divider" />

      {/* ── META ── */}
      <motion.div {...fadeUp(0.35)} className="pm-meta-grid" style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', padding:'2rem 5vw', gap:'1.5rem 2rem', borderBottom:'1px solid rgba(150,150,150,.09)' }}>
        {(content?.meta || [
          { label:'Project', value:`${project.namePart1} ${project.namePart2}` },
          { label:'Status', value:'Live' },
          { label:'Role', value:'Full-Stack' },
          { label:'Team', value:'Solo' },
          { label:'Stack', value:project.tech?.slice(0,2).join(' · ') },
        ]).map((m,i) => (
          <div key={i}><div className="pm-label">{m.label}</div><div className="pm-value">{m.value}</div></div>
        ))}
      </motion.div>

      {/* ── STACK ── */}
      <motion.div {...fadeUp(0.4)} style={{ padding:'1.4rem 5vw', borderBottom:'1px solid rgba(150,150,150,.09)', display:'flex', flexWrap:'wrap', gap:'.38rem', alignItems:'center' }}>
        <span className="pm-label" style={{ marginBottom:0, marginRight:'.5rem' }}>Stack</span>
        {(content?.stack || project.tech).map((t,i) => (
          <span key={i} style={{ padding:'.22rem .7rem', border:'1px solid rgba(150,150,150,.2)', fontSize:'.68rem', fontWeight:600, letterSpacing:'.04em', textTransform:'uppercase' }}>{t}</span>
        ))}
      </motion.div>

      {/* ── VIDEO ── */}
      <motion.div {...fadeUp(0.45)} style={{ padding:'2.5rem 5vw' }}>
        <div style={{ width:'100%', overflow:'hidden', border:'1px solid rgba(150,150,150,.12)', boxShadow:'0 20px 60px rgba(0,0,0,.09)', position:'relative' }}>
          <video src={project.video} autoPlay loop muted playsInline style={{ width:'100%', height:'auto', display:'block' }} />
          {isMarqelle && (
            <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'rgba(0,0,0,0.2)' }}>
               <h1 style={{ fontFamily:'"Playfair Display", "Times New Roman", Georgia, serif', fontSize:'clamp(3.5rem, 10vw, 9rem)', color:'#fff', margin:0, fontWeight:500, letterSpacing:'-0.01em', lineHeight:1 }}>Marqelle.</h1>
               <p style={{ fontFamily:'"Inter", "Helvetica Neue", Arial, sans-serif', fontSize:'clamp(0.7rem, 1.8vw, 1.1rem)', color:'#fff', fontStyle:'italic', opacity:0.85, marginTop:'1rem', textAlign:'center', padding:'0 20px', fontWeight:300 }}>Designed with purpose, crafted with precision, and worn with confidence</p>
            </div>
          )}
        </div>
      </motion.div>

      {content && <>
        <div className="pm-divider" />

        {/* ── VISION ── */}
        <div className="pm-vision-grid" style={{ padding:'4.5rem 5vw', display:'grid', gridTemplateColumns:'1fr 2fr', gap:'4vw', alignItems:'start' }}>
          <div>
            <motion.span className="pm-tag" {...fadeUp(0)}>01 / Context</motion.span>
            <motion.h2 className="pm-h2" {...fadeUp(0.05)} style={{ whiteSpace:'pre-line' }}>
              {content.visionTitle}
            </motion.h2>
          </div>
          <div>
            {content.visionBody.map((para, i) => (
              <motion.p key={i} className="pm-body" {...fadeUp(i * 0.06)} style={{ marginBottom: i < content.visionBody.length - 1 ? '1rem' : 0 }}>
                {para}
              </motion.p>
            ))}
          </div>
        </div>

        <div className="pm-divider" />

        {/* ── ROLES / PRODUCT ── */}
        <div style={{ padding:'4.5rem 5vw' }}>
          <motion.span className="pm-tag" {...fadeUp(0)}>02 / The Product</motion.span>
          <motion.h2 className="pm-h2" {...fadeUp(0.05)}>
            {content.roles.length > 2 ? 'Four roles, one premium ecosystem.' : 'Two roles, one premium ecosystem.'}
          </motion.h2>
          <div className="pm-roles-grid pm-border-box" style={{ display:'grid', gridTemplateColumns:`repeat(${content.roles.length},1fr)`, marginTop:'1.8rem' }}>
            {content.roles.map((r,i) => (
              <motion.div key={i} {...fadeUp(i*0.07)} className={i<content.roles.length-1?'pm-role-cell':''} style={{ padding:'1.6rem', borderRight:i<content.roles.length-1?'1px solid rgba(150,150,150,.12)':undefined }}>
                <div className="pm-label" style={{ marginBottom:'.35rem' }}>Role {String(i+1).padStart(2,'0')}</div>
                <div style={{ fontSize:'.9rem', fontWeight:700, marginBottom:'.55rem' }}>{r.role}</div>
                <p style={{ fontSize:'.8rem', lineHeight:1.7, opacity:.52, margin:0 }}>{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="pm-divider" />

        {/* ── GALLERY ── */}
        <div style={{ padding:'4.5rem 5vw' }}>
          <motion.span className="pm-tag" {...fadeUp(0)}>03 / The Build</motion.span>
          <motion.h2 className="pm-h2" {...fadeUp(0.05)}>A seamless end-to-end experience.</motion.h2>
          <div className="pm-gallery-grid" style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'1px', background:'rgba(150,150,150,.09)', marginTop:'1.8rem', border:'1px solid rgba(150,150,150,.09)' }}>
            {content.gallery.map(([n,t,d],i) => (
              <motion.div key={i} {...fadeUp(i*0.04)} style={{ padding:'1.4rem 1.6rem', background:'var(--bg-color)' }}>
                <div style={{ fontSize:'.6rem', fontWeight:800, letterSpacing:'.1em', opacity:.28, marginBottom:'.2rem' }}>{n}</div>
                <div style={{ fontSize:'.9rem', fontWeight:700, marginBottom:'.18rem' }}>{t}</div>
                <div style={{ fontSize:'.8rem', opacity:.48, lineHeight:1.55 }}>{d}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="pm-divider" />

        {/* ── ARCHITECTURE ── */}
        <div style={{ padding:'4.5rem 5vw' }}>
          <motion.span className="pm-tag" {...fadeUp(0)}>04 / Architecture</motion.span>
          <motion.h2 className="pm-h2" {...fadeUp(0.05)}>Under the hood.</motion.h2>
          <div className="pm-arch-flex" style={{ display:'flex', flexWrap:'wrap', gap:'1px', background:'rgba(150,150,150,.09)', marginTop:'1.8rem' }}>
            {content.arch.map(([lbl,stack,desc],i) => (
              <motion.div key={i} {...fadeUp(i*0.07)} className="pm-arch-card" style={{ background:'var(--bg-color)' }}>
                <div className="pm-arch-lbl">{lbl}</div>
                <div className="pm-arch-stack">{stack}</div>
                <p className="pm-arch-desc">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="pm-divider" />

        {/* ── OUTCOMES ── */}
        <div style={{ padding:'4.5rem 5vw' }}>
          <motion.span className="pm-tag" {...fadeUp(0)}>05 / Outcome</motion.span>
          <motion.h2 className="pm-h2" {...fadeUp(0.05)}>What it is, in numbers.</motion.h2>
          <div className="pm-stats-grid pm-border-box" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', marginTop:'1.8rem' }}>
            {content.stats.map((s,i) => {
              const num = Array.isArray(s) ? s[0] : s.num;
              const lbl = Array.isArray(s) ? s[1] : s.lbl;
              const desc = Array.isArray(s) ? s[2] : s.desc;
              return (
                <motion.div key={i} {...fadeUp(i*0.07)} className={i<3?'pm-stat-cell':''} style={{ padding:'1.8rem 1.6rem', borderRight:i<3?'1px solid rgba(150,150,150,.09)':undefined }}>
                  <div className="pm-stat-num">{num}</div>
                  <div className="pm-stat-lbl">{lbl}</div>
                  <div className="pm-stat-desc">{desc}</div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="pm-divider" />

        {/* ── COLOPHON ── */}
        <div className="pm-colophon" style={{ padding:'3.5rem 5vw 4rem', display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:'2rem' }}>
          <div>
            <span className="pm-tag">Colophon / Built by one engineer.</span>
            <div style={{ fontSize:'1rem', fontWeight:700 }}>Arun Joseph</div>
            <div style={{ fontSize:'.8rem', opacity:.42, marginTop:'.2rem' }}>{content.colophon}</div>
          </div>
        </div>
      </>}

      {!content && (
        <div style={{ padding:'2rem 5vw 4rem' }}>
          <p className="pm-body">{project.description}</p>
        </div>
      )}

      {/* ── NEXT PROJECT ── */}
      {nextProject && (
        <>
          <div style={{ height:'1px', background:'var(--text-primary)', opacity:.09 }} />
          <div style={{ padding:'4rem 5vw 5rem' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'2.5rem' }}>
              <span className="pm-tag" style={{ margin:0 }}>Next Project</span>
              <ArrowRight size={16} style={{ opacity:.3 }} />
            </div>
            <button className="pm-next-card" onClick={() => onOpenNext(nextIndex)}>
              <NextProjectPreview project={nextProject} onOpen={onClose} nextProject={nextProject} />
            </button>
          </div>
        </>
      )}

    </motion.div>
  );
};

// ─── Next Project inline preview card ────────────────────────
const NextProjectPreview = ({ project, onOpen, nextProject }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const videoScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.92]);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={containerRef}
      className="pm-next-inner"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position:'relative', width:'100%', height:'50vh', overflow:'hidden', border:'1px solid rgba(150,150,150,.12)', cursor:'pointer' }}
    >
      <motion.div style={{ scale: videoScale, width:'100%', height:'100%' }}>
        <video src={project.video} autoPlay loop muted playsInline style={{ width:'100%', height:'100%', objectFit:'cover' }} />
      </motion.div>
      {/* Overlay text */}
      <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'2rem', background:'linear-gradient(to top, rgba(0,0,0,.55) 0%, transparent 60%)' }}>
        <h2 style={{ fontSize:'clamp(1.5rem,5vw,4rem)', fontWeight:900, lineHeight:.9, letterSpacing:'-.04em', textTransform:'uppercase', margin:0, color:'#fff' }}>
          {project.namePart1}<br/>
          <span style={{ color:'transparent', WebkitTextStroke:'2px #fff' }}>{project.namePart2}</span>
        </h2>
        <div style={{ display:'flex', alignItems:'center', gap:'.5rem', marginTop:'1rem', color:'#fff', opacity:.7, fontSize:'.75rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'.12em' }}>
          View Case Study <ArrowRight size={13} />
        </div>
      </div>
    </div>
  );
};

// ─── ProjectDisplay (home screen card) ───────────────────────
const ProjectDisplay = ({ project, index, onOpenModal, isMobile }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const textY = useTransform(scrollYProgress, [0, 1], ['-20vh', '20vh']);
  const videoScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85]);
  const inverseScale = useTransform(videoScale, v => 1 / v);
  const typographyStyle = { fontSize:'clamp(4rem,12vw,15rem)', fontWeight:900, lineHeight:0.85, margin:0, letterSpacing:'-0.05em', textTransform:'uppercase', whiteSpace:'nowrap' };

  return (
    <div
      ref={containerRef}
      style={{ position:'relative', height:isMobile?'auto':'150vh', padding:isMobile?'2vh 0':0, width:'100%', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden', background:'transparent', marginBottom:isMobile?'0':'10vh' }}
    >
      <div onClick={onOpenModal} style={{ position:'absolute', inset:0, zIndex:20, cursor:'pointer' }} />

      {isMobile ? (
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', width:'100%', height:'100%', zIndex:10, pointerEvents:'none', position:'relative' }}>
          <div style={{ width:'90vw', height:'auto', border:'1px solid rgba(150,150,150,0.2)', overflow:'hidden', borderRadius:'12px', position:'relative', zIndex:1 }}>
            <video src={project.video} autoPlay loop muted playsInline style={{ width:'100%', height:'auto', display:'block' }} />
          </div>
          <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', textAlign:'center', width:'100%', zIndex:2 }}>
            <h2 style={{ fontSize:'8vw', fontWeight:900, margin:0, lineHeight:0.9, letterSpacing:'-0.02em', color:'#ffffff' }}>{project.namePart1}</h2>
            <h2 style={{ fontSize:'8vw', fontWeight:900, margin:0, lineHeight:0.9, letterSpacing:'-0.02em', color:'transparent', WebkitTextStroke:'2px #ffffff' }}>{project.namePart2}</h2>
          </div>
        </div>
      ) : (
        <>
          <motion.div style={{ position:'absolute', zIndex:0, top:'50%', left:'50%', width:'100vw', height:'150vh', x:'-50%', y:'-50%', pointerEvents:'none' }}>
            <motion.div style={{ position:'absolute', top:'50%', left:0, marginTop:'-15vh', y:textY, width:'100%', display:'flex', flexDirection:'column', alignItems:index%2===0?'flex-start':'flex-end', padding:'0 2vw', boxSizing:'border-box' }}>
              <h2 style={{ ...typographyStyle, color:'var(--text-primary)' }}>{project.namePart1}</h2>
              <h2 style={{ ...typographyStyle, color:'transparent', WebkitTextStroke:'2px var(--text-primary)' }}>{project.namePart2}</h2>
            </motion.div>
          </motion.div>
          <motion.div style={{ position:'absolute', zIndex:1, width:'85vw', height:'75vh', scale:videoScale, pointerEvents:'none' }}>
            <div style={{ width:'100%', height:'100%', position:'relative', overflow:'hidden', border:'1px solid rgba(255,255,255,0.1)' }}>
              <video src={project.video} autoPlay loop muted playsInline style={{ width:'100%', height:'100%', objectFit:'cover' }} />
              <motion.div style={{ position:'absolute', top:'50%', left:'50%', width:'100vw', height:'150vh', x:'-50%', y:'-50%', scale:inverseScale, pointerEvents:'none' }}>
                <motion.div style={{ position:'absolute', top:'50%', left:0, marginTop:'-15vh', y:textY, width:'100%', display:'flex', flexDirection:'column', alignItems:index%2===0?'flex-start':'flex-end', padding:'0 2vw', boxSizing:'border-box' }}>
                  <h2 style={{ ...typographyStyle, color:'#fff' }}>{project.namePart1}</h2>
                  <h2 style={{ ...typographyStyle, color:'transparent', WebkitTextStroke:'2px #fff' }}>{project.namePart2}</h2>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

// ─── Main Projects section ────────────────────────────────────
export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    const handlePopState = () => setSelectedProject(null);
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const projects = [
    {
      namePart1: 'GRAND AUTO',
      namePart2: 'DEPOT ONE',
      video: '/project 1.mp4',
      link: 'https://gd-1-frontend-u2if.vercel.app/',
      tech: ['ASP.NET Core (.NET 8)', 'React.js', 'SQL Server', 'SignalR', 'MediatR', 'Docker', 'AWS', 'RAG'],
      description: 'A multi-tenant platform connecting vehicle owners, parking providers, and service centers for long-term vehicle storage, maintenance services and fleet management.',
    },
    {
      namePart1: 'MARQELLE',
      namePart2: 'ECOMMERCE',
      video: '/MarqelleHomevideo - Trim.mp4',
      link: 'https://marqelle-ecommerce.vercel.app',
      tech: ['React', 'ASP.NET Core', 'SQL Server', 'Tailwind CSS', 'RabbitMQ', 'Razorpay', 'Cloudinary', 'JWT Auth'],
      description: 'A comprehensive e-commerce suite platform with product catalog, cart, wishlist, order management, and a full admin panel. Built with Clean Architecture on ASP.NET Core and React.',
    },
  ];

  const openModal = (proj, idx) => {
    setSelectedProject(proj);
    setSelectedIndex(idx);
    window.history.pushState({ modalOpen: true }, '');
  };

  const closeModal = () => {
    if (window.history.state?.modalOpen) {
      window.history.back();
    } else {
      setSelectedProject(null);
    }
  };

  const openNext = (idx) => {
    closeModal();
    setTimeout(() => {
      setSelectedProject(projects[idx]);
      setSelectedIndex(idx);
      window.history.pushState({ modalOpen: true }, '');
    }, 500);
  };

  return (
    <>
      <section className="projects-section" id="works" style={{ position:'relative', width:'100%', zIndex:10, background:'transparent' }}>
        <div style={{ padding:'0 5%', marginBottom:isMobile?'2vh':'5vh' }}>
          <h1 style={{ fontSize:'clamp(3rem,8vw,10rem)', fontWeight:900, color:'var(--text-primary)', margin:0, lineHeight:0.9, letterSpacing:'-0.05em' }}>
            SELECTED <br/> <span style={{ color:'transparent', WebkitTextStroke:'2px var(--text-primary)' }}>WORKS</span>
          </h1>
        </div>
        {projects.map((proj, idx) => (
          <ProjectDisplay key={idx} project={proj} index={idx} onOpenModal={() => openModal(proj, idx)} isMobile={isMobile} />
        ))}
      </section>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={closeModal}
            projects={projects}
            currentIndex={selectedIndex}
            onOpenNext={openNext}
          />
        )}
      </AnimatePresence>
    </>
  );
}
