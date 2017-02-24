import { mount } from 'avoriaz';
import Vue from 'vue';
import Gallery from 'src/components/restaurant/Gallery';

describe('Gallery.vue', () => {
  const Constructor = Vue.extend(Gallery);
  it('it renders the previous and next buttons when multiple images passed', () => {
    const vm = new Constructor({
      props: ['images'],
      propsData: {
        images: ['imgUrl1', 'imgUrl2'],
      },
    }).$mount();

    expect(vm.$el.querySelectorAll('.is-large').length)
      .to.equal(2);
  });
  it('it does not render the previous and next buttons when single images', () => {
    const vm = new Constructor({
      props: ['images'],
      propsData: {
        images: ['imgUrl1'],
      },
    }).$mount();

    expect(vm.$el.querySelectorAll('.is-large').length)
      .to.equal(0);
  });
  it('shows the right image url', () => {
    const imgUrl = 'http://localhost/imgUrl1';
    const vm = new Constructor({
      props: ['images'],
      propsData: {
        images: [imgUrl],
      },
    }).$mount();

    expect(vm.$el.querySelector('img').src)
    .to.equal(imgUrl);
  });

  it('shows the right image url after user click', () => {
    const images = [
      'http://localhost/img1',
      'http://localhost/img2',
      'http://localhost/img3',
    ];
    const wrapper = mount(Gallery, {
      props: ['images'],
      propsData: {
        images,
      },
    });

    const img = wrapper.vm.$el.querySelector('img');
    expect(img.src).to.equal(images[0]);

    const previous = wrapper.find('.gallery-previous')[0];
    previous.simulate('click');

    expect(img.src).to.equal(images[2]);

    previous.simulate('click');

    expect(img.src).to.equal(images[1]);

    previous.simulate('click');

    expect(img.src).to.equal(images[0]);

    const next = wrapper.find('.gallery-next')[0];
    next.simulate('click');

    expect(img.src).to.equal(images[1]);

    next.simulate('click');
    next.simulate('click');

    expect(img.src).to.equal(images[0]);
  });
});
