const childrenWithExtraProp = React.Children.map(children, child => {
    return React.cloneElement(child, {
      isPlaying: child.props.title === currentPlayingTitle
    });
});