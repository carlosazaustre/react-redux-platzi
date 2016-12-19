import React from 'react';
import { FormattedMessage } from 'react-intl';
import Image from 'react-lazy-image';

import API from '../../api';
import Title from '../../shared/components/Title';

class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      gallery: [],
    };
  }

  componentDidMount() {
    this.initialFetch();
  }

  async initialFetch() {
    const gallery = await API.gallery.getPage(1);
    this.setState({
      loading: false,
      gallery: this.state.gallery.concat(gallery),
    });
  }

  render() {
    return (
      <section name="gallery">
        <Title>
          <FormattedMessage id="title.gallery" />
        </Title>
        <section>
          {this.state.gallery.map(image => (
            <Image
              key={image.id}
              source={image.url}
              width="600"
              height="600"
            />
          ))}
        </section>
      </section>
    );
  }
}

Gallery.propTypes = {

};

export default Gallery
