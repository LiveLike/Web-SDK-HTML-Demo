class CustomSlider extends LiveLikeEmojiSlider {
  render() {
    const initialMag = Math.round(this.widgetPayload.initial_magnitude * 100);
    const resultMark =
      this.phase !== "interactive" && (this.val || this.val === 0)
        ? html`
            <div
              class="result-mark"
              style="left: calc(${Math.round(this.average_magnitude * 100)}%)"
            ></div>
          `
        : null;

    return html`
      <template>
        <style>
          .slider-input::-webkit-slider-runnable-track {
            height: 8px;
            background: rgba(255, 255, 255, 0.1);
            background-image: linear-gradient(
              90deg,
              #0028ff,
              #dc0028 var(--x),
              transparent 0
            );
          }
          .slider-input::-moz-range-track {
            height: 8px;
            background: rgba(255, 255, 255, 0.1);
            background-image: linear-gradient(
              90deg,
              #0028ff,
              #dc0028 var(--x),
              transparent 0
            );
          }
          .slider-input::-ms-track {
            height: 8px;
            background: rgba(255, 255, 255, 0.1);
            background-image: linear-gradient(
              90deg,
              #0028ff,
              #dc0028 var(--x),
              transparent 0
            );
          }
        </style>
        <livelike-widget-root class="custom-widget">
          <livelike-widget-header class="widget-header" slot="header">
            <livelike-timer class="custom-timer"></livelike-timer>
            <div class="widget-kind">EMOJI SLIDER</div>
            <livelike-title class="custom-title"></livelike-title>
          </livelike-widget-header>
          <livelike-widget-body>
            <form style="--val: ${initialMag};" class="input-form">
              <div class="input-container">
                <input
                  type="range"
                  class="slider-input"
                  value="${initialMag}"
                />
                ${resultMark}
              </div>
              <output class="slider-thumb">
                <img class="slider-image" />
              </output>
            </form>
          </livelike-widget-body>
        </livelike-widget-root>
      </template>
    `;
  }
}
customElements.define("custom-slider", CustomSlider);

class CustomAlert extends LiveLikeAlert {
  render() {
    const hasCaptionAndMedia = !!this.text && !!this.image_url;

    const hasOnlyMedia = !this.text && !!this.image_url;

    const hasOnlyCaption = !!this.text && !this.image_url;

    return html`
      <template>
        <style>
          livelike-footer a.widget-link {
            margin-top: 10px;
            border-radius: 5px;
            text-align: center;
            color: white;
            background-image: none;
            padding: 1rem;
            background-color: #222;
          }
          livelike-footer div.sponsor-section {
            margin-top: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          livelike-footer div.sponsor-section span {
            margin-right: 10px;
            color: #bbbbbb;
          }
          livelike-footer div.sponsor-section img {
            height: 30px;
            width: auto;
          }
          .widget-caption {
            color: #000;
            opacity: 60%;
          }
          .widget-media img {
            max-height: none;
            height: auto;
          }
        </style>
        <livelike-widget-root class="custom-widget">
          <livelike-widget-header class="widget-header" slot="header">
            <livelike-timer class="custom-timer"></livelike-timer>
            <div class="widget-kind">ALERT</div>
            <livelike-title class="custom-title"></livelike-title>
          </livelike-widget-header>
          <livelike-widget-body>
            ${hasCaptionAndMedia
              ? html`
                  <figure class="widget-captioned-media">
                    ${this.text &&
                      html`
                        <figcaption class="widget-caption media-caption">
                          ${this.text}
                        </figcaption>
                      `}
                    ${this.image_url &&
                      html`
                        <img
                          class="widget-media"
                          src=${this.image_url}
                          alt=${this.text}
                        />
                      `}
                  </figure>
                `
              : hasOnlyMedia
              ? html`
                  <div class="widget-media">
                    <img src=${this.image_url} />
                  </div>
                `
              : hasOnlyCaption
              ? html`
                  <div class="widget-caption-container">
                    <span class="widget-caption">${this.text}</span>
                  </div>
                `
              : null}
            ${this.link_url &&
              html`
                <livelike-footer>
                  <a
                    class="widget-link"
                    href=${this.link_url}
                    target="_blank"
                    @click=${this.trackLinkOpened}
                    >${this.link_label}</a
                  >
                </livelike-footer>
              `}
          </livelike-widget-body>
        </livelike-widget-root>
      </template>
    `;
  }
}
customElements.define("custom-alert", CustomAlert);

class CustomCheerOption extends LiveLikeWidgetElement {
  votePercentage = () => {
    const totalVotes = this.items.reduce((a, b) => a + b["vote_count"], 0);
    return totalVotes > 0
      ? Math.round((this.item.vote_count / totalVotes) * 100)
      : 0;
  };
  optionVoteUpdated = (e) => {
    const imageContainer = this.shadowRoot.querySelector("livelike-image");
    imageContainer &&
      imageContainer.style.setProperty(
        "background",
        `linear-gradient(0deg, #0096ff ${this.votePercentage()}%, transparent 0)`
      );
  };
  render() {
    return html`
      <style>
        livelike-image {
          width: 80px;
          padding: 10px;
          box-shadow: 0 0 0 1px rgb(255 255 255 / 20%) inset;
          border-radius: 6px;
        }
        livelike-image img {
          border-radius: 4px;
        }
        livelike-description {
          font-size: 1rem;
          text-align: center;
          line-height: 1.2;
        }
      </style>
      <livelike-image
        height="auto"
        width="80px"
        style="background: linear-gradient(0deg, #0096ff ${this.votePercentage()}%, transparent 0);"
      ></livelike-image>
      <livelike-description></livelike-description>
    `;
  }
}
customElements.define("custom-cheer-option", CustomCheerOption);
