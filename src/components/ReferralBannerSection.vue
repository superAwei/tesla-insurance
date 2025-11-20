<template>
  <section class="referral-banner-section">
    <div class="referral-banner-card">
      <!-- Title with SVG Icon -->
      <h3 class="banner-title">
        <svg class="gift-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="10" width="18" height="12" rx="1"/>
          <rect x="3" y="10" width="18" height="4" rx="1"/>
          <line x1="12" y1="10" x2="12" y2="22"/>
          <path d="M12 10 C9 10, 9 6, 12 6 C15 6, 15 10, 12 10"/>
        </svg>
        投保即享好禮
      </h3>

      <!-- Description -->
      <p class="banner-description">
        成功投保,即可獲得 <span class="highlight-text">$1,000</span> 超商禮券
      </p>

      <!-- CTA Button -->
      <button
        @click="scrollToReferralFAQ"
        class="referral-cta-btn">
        了解詳情 →
      </button>
    </div>
  </section>
</template>

<script setup>
const scrollToReferralFAQ = () => {
  // Google Analytics 事件追蹤 - 推薦橫幅按鈕點擊
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'referral_click', {
      'event_category': 'engagement',
      'event_label': 'referral_banner'
    })
  }

  const faq = document.getElementById('faq')
  if (faq) {
    const headerOffset = 80
    const elementPosition = faq.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })

    // Scroll to and expand the referral FAQ item
    setTimeout(() => {
      const referralFaqItem = document.querySelector('[data-faq="referral"]')
      if (referralFaqItem) {
        // Scroll the item into view
        referralFaqItem.scrollIntoView({ behavior: 'smooth', block: 'center' })

        // Expand the FAQ item by clicking its button if not already expanded
        setTimeout(() => {
          const button = referralFaqItem.querySelector('button')
          const isExpanded = button?.getAttribute('aria-expanded') === 'true'
          if (button && !isExpanded) {
            button.click()
          }
        }, 500)
      }
    }, 800)
  }
}
</script>

<style scoped>
.referral-banner-section {
  position: relative;
}

.referral-banner-card {
  /* Full-width banner - break container constraints */
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);

  /* White background */
  background: #FFFFFF;

  /* No borders */
  border: none;

  /* Subtle shadow for visual separation */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05),
              0 -2px 8px rgba(0, 0, 0, 0.05);

  /* Spacing */
  padding: 60px 5%;
  margin-top: 80px;
  margin-bottom: 80px;

  /* Layout */
  text-align: center;
  box-sizing: border-box;

  transition: all 0.3s ease;
}

/* Banner Title */
.banner-title {
  color: #111827; /* Black title */
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 16px;

  /* Flexbox for icon + text alignment */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

/* Banner Description */
.banner-description {
  color: #374151; /* Deep gray text */
  font-size: 18px;
  margin-bottom: 24px;
  line-height: 1.6;
}

/* Gift Icon */
.gift-icon {
  width: 32px;
  height: 32px;
  color: #E31E2D; /* Tesla red */
  stroke-width: 1.5;
  flex-shrink: 0;
}

/* $1,000 Highlight */
.highlight-text {
  color: #E31E2D; /* Tesla red highlight */
  font-weight: 700;
  font-size: 22px;
}

/* CTA Button */
.referral-cta-btn {
  display: inline-block;
  padding: 14px 32px;
  background: #E31E2D; /* Tesla red button */
  color: white;
  font-weight: 600;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(227, 30, 45, 0.3);
}

.referral-cta-btn:hover {
  background: #C41E3A; /* Darker red on hover */
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(227, 30, 45, 0.4);
}

/* Mobile responsive (<768px) */
@media (max-width: 768px) {
  .referral-banner-card {
    padding: 40px 20px;
    margin-top: 60px;
    margin-bottom: 60px;
  }

  .banner-title {
    font-size: 22px;
    gap: 8px;
    line-height: 1.4;
  }

  .banner-description {
    font-size: 16px;
  }

  .referral-cta-btn {
    width: 100%;
    max-width: 300px;
  }

  .gift-icon {
    width: 28px;
    height: 28px;
  }

  .highlight-text {
    font-size: 20px;
  }
}

/* Tablet responsive (768px-1024px) */
@media (min-width: 768px) and (max-width: 1024px) {
  .referral-banner-card {
    padding: 50px 4%;
  }

  .banner-title {
    font-size: 26px;
  }
}
</style>
