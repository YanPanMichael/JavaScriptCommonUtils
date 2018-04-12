function include( url, type ){
    // First make sure it hasn't been loaded by something else.
    if( Array.contains( includedFile, url ) )
        return;

    // Determine the MIME-type
    var jsExpr = new RegExp( "js$", "i" );
    var cssExpr = new RegExp( "css$", "i" );
    if( type == null )
        if( jsExpr.test( url ) )
            type = 'text/javascript';
        else if( cssExpr.test( url ) )
            type = 'text/css';

    // Create the appropriate element.
    var tag = null;
    switch( type ){
        case 'text/javascript' :
            tag = document.createElement( 'script' );
            tag.type = type;
            tag.src = url;
            break;
        case 'text/css' :
            tag = document.createElement( 'link' );
            tag.rel = 'stylesheet';
            tag.type = type;
            tag.href = url;
            break;
    }

    // Insert it to the <head> and the array to ensure it is not
    // loaded again.
    document.getElementsByTagName("head")[0].appendChild( tag );
    Array.add( includedFile, url );
}