// @ts-nocheck
"use client";
import React from 'react';
import './Services.css';

export function Services() {
  const services = [
    {
      num: "01",
      title: "Frontend Development",
      desc: "Crafting immersive, high-performance user interfaces using React, Next.js, and modern CSS. Focused on pixel-perfect implementations, seamless responsive design, and fluid user experiences."
    },
    {
      num: "02",
      title: "Backend Development",
      desc: "Building robust, scalable server-side architectures. Designing RESTful and GraphQL APIs, microservices, and secure authentication flows to power complex web applications."
    },
    {
      num: "03",
      title: "UI/UX Designing",
      desc: "Translating user needs into intuitive, beautiful interfaces. Creating wireframes, high-fidelity prototypes, and design systems that prioritize usability and brand identity."
    },
    {
      num: "04",
      title: "Database Management",
      desc: "Architecting efficient data models and optimizing query performance. Experienced with SQL and NoSQL databases, ensuring data integrity, security, and high availability."
    },
    {
      num: "05",
      title: "Cloud Deployment",
      desc: "Deploying and scaling applications seamlessly. Utilizing Docker, CI/CD pipelines, and cloud platforms like AWS and Vercel to ensure zero-downtime releases and resilient infrastructure."
    }
  ];

  return (
    <section className="services-container" id="services">
      <div className="services-header">
        <p className="services-overline">Core Capabilities</p>
        <h2 className="services-title">My Services</h2>
      </div>

      <div className="services-list">
        {services.map((service, idx) => (
          <div key={idx} className="service-row">
            <div className="service-row-top">
              <span className="service-num">{service.num}</span>
              <h3 className="service-name">{service.title}</h3>
            </div>
            <p className="service-desc">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
