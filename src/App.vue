<script setup>
import cv from '@/assets/cv.pdf'
</script>

<template>

  <div>
      <header id="hero">
        <h1>aspen y. wang</h1>
      </header>

    <body>
    <section class="section" id="about-container" >
      <div class="about-header">
        <img src="./assets/me.jpg" class="avatar" alt="Aspen Wang" />

        <div class="about-info">
          <div class="contact-block">
            <h2>[education]</h2>

            <p>rising senior @ <a href="https://vassar.edu">vassar college</a></p>
          <p>major: computer science</p>
          <p>minors: statistics, history</p>
          </div>
          <!-- group your contact info here -->
          <div class="contact-block">
            <h2>[contact]</h2>

            <div class="contact-links">
              <a href="https://github.com/aspenywang" target="_blank">github</a>
              <a href="https://www.linkedin.com/in/aspen-w-334619251/" target="_blank">linkedin</a>
              <a :href="cv" target="_blank">cv</a>
            </div>
            <a class="email-link" href="mailto:yumengwang@vassar.edu">
              yumengwang [at] vassar [dot] edu
            </a>
          </div>
        </div>
      </div>

    </section>
    <section class="section" id="content-container" >
      <!-- below: the actual about text -->
      <div class="about-text">
        <h2>[about]</h2>

        <p>
          My passion for exploring human-centered applications of language technologies has driven me to pursue
          research opportunities that lead to graduate studies in NLP and LLM. My research interests include
          decision-making, knowledge reasoning, machine translation, speech synthesis, and human-computer
          interaction. I wish to contribute to the development of AI systems that improve linguistic accessibility and
          enable seamless, context-aware communication across user communities
        </p>
        <h2>[experience]</h2>

        <p>
          I have worked as a summer research intern at
          <a href="https://lab.depositar.io" target="_blank">depositar lab</a>,
          Academia Sinica.
        </p>
      </div>
    </section>
    </body>

    <footer>
    </footer>


  </div>
</template>

<script>
export default {
  name: "App",
};
</script>
