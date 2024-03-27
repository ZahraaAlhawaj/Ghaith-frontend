<script>
export default {
  name: 'AboutPage'
}
</script>

<template>
  <div class="about-us">
    <div class="container">
      <div class="title">
        <h1 class="yellow-underlined title">About Us</h1>
      </div>

      <div class="image-section">
        <div class="image-container">
          <img src="/images/5.jpeg" alt="Team Image" />
        </div>
      </div>

      <div class="paragraph-section">
        <div class="paragraph-container">
          <p>
            Extending a helping hand to those in need, our charity provides
            vital support and resources to empower individuals and communities.
            Through our compassionate initiatives, we strive to create positive
            change, inspire hope, and make a lasting impact on the lives of
            those facing challenges.
          </p>
        </div>
      </div>

      <div class="section-divider"></div>

      <h2 class="quote">
        "Our passion drives us and our creativity defines us."
      </h2>

      <div class="features-container">
        <div class="feature">
          <h3>Quality</h3>
          <p>
            We are committed to delivering the highest quality products and
            services to our clients.
          </p>
        </div>
        <div class="feature">
          <h3>Innovation</h3>
          <p>
            We continuously strive to innovate and stay ahead to meet the
            ever-changing market demands.
          </p>
        </div>
        <div class="feature">
          <h3>Collaboration</h3>
          <p>
            Collaboration is at the heart of our work, enabling us to create
            impactful solutions.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* General styles */

.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 40px;
}

/* Styles for the title section */

/* Styles for the image section */

.image-section {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

.image-container {
  width: 800%;
}

.image-container img {
  width: 100%;
  object-fit: cover;
}

/* Styles for the paragraph section */

.paragraph-section {
  margin-bottom: 40px;
}

.paragraph-container p {
  line-height: 1.6;
  color: #4b5f23;
}

/* Other styles */

.section-divider {
  height: 1px;
  background-color: #4b5f23;
  margin-bottom: 40px;
}

.quote {
  text-align: center;
  font-style: italic;
  color: #4b5f23;
  margin-bottom: 30px;
}

.features-container {
  display: flex;
  justify-content: space-between;
}

.feature {
  width: 30%;
  padding: 20px;
  background-color: #b1bf5c;
  border-radius: 10px;
}

.feature h3 {
  font-size: 1.2em;
  margin-bottom: 10px;
  color: #4b5f23;
}

.feature p {
  color: #4b5f23;
}

.title {
  margin-top: -2%;
  text-align: center;
  margin-bottom: 2%;
  color: #4b5f23;
  display: flex;
  justify-content: center;
}

.yellow-underlined {
  border-bottom: solid 10px #b1bf5c;
  color: #4b5f23;
  line-height: 0.35em;
  margin-top: 0.65em;
  display: inline-block;
  padding-left: 0.15em;
  padding-right: 0.15em;
  align-self: center;
  margin-bottom: 2%;
}
</style>
