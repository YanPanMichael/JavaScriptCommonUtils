const scrollIntoViewIfNeededUtil = function (elemObj, centerIfNeeded) {
    if (!!elemObj && elemObj instanceof Element) {
        if (!Object.getPrototypeOf(elemObj).scrollIntoViewIfNeeded) {
            centerIfNeeded = arguments.length === 0 ? true : !!centerIfNeeded;
            var childNode = elemObj,
                parentNode = elemObj.parentNode,
                parentComputedStyle = window.getComputedStyle(parentNode, null),
                parentBorderTopWidth = parseInt(parentComputedStyle.getPropertyValue('border-top-width')),
                parentBorderLeftWidth = parseInt(parentComputedStyle.getPropertyValue('border-left-width')),
                overTop = childNode.offsetTop - parentNode.offsetTop < parentNode.scrollTop,
                overBottom = (childNode.offsetTop - parentNode.offsetTop + childNode.clientHeight - parentBorderTopWidth) > (parentNode.scrollTop + parentNode.clientHeight) && !!parentNode.clientHeight,
                overLeft = childNode.offsetLeft - parentNode.offsetLeft < parentNode.scrollLeft,
                overRight = (childNode.offsetLeft - parentNode.offsetLeft + childNode.clientWidth - parentBorderLeftWidth) > (parentNode.scrollLeft + parentNode.clientWidth) && !!parentNode.clientWidth,
                alignWithTop = overTop && !overBottom;

            if ((overTop || overBottom) && centerIfNeeded) {
                parentNode.scrollTop = childNode.offsetTop - parentNode.offsetTop - parentNode.clientHeight / 2 - parentBorderTopWidth + childNode.clientHeight / 2;
            }

            if ((overLeft || overRight) && centerIfNeeded) {
                parentNode.scrollLeft = childNode.offsetLeft - parentNode.offsetLeft - parentNode.clientWidth / 2 - parentBorderLeftWidth + childNode.clientWidth / 2;
            }

            if ((overTop || overBottom || overLeft || overRight) && !centerIfNeeded) {
                childNode.scrollIntoView && childNode.scrollIntoView(alignWithTop);
            }

        } else {
            elemObj.scrollIntoViewIfNeeded(centerIfNeeded);
        }
    }
}

const scrollIntoViewIfNeededUtilByBounding = function (elemObj, centerIfNeeded) {
    if (!!elemObj && elemObj instanceof Element) {
        if (!Object.getPrototypeOf(elemObj).scrollIntoViewIfNeeded) {
            centerIfNeeded = arguments.length === 0 ? true : !!centerIfNeeded;
            var childNode = elemObj,
                parentNode = elemObj.parentNode,
                childNodeRect = childNode.getBoundingClientRect(),
                parentNodeRect = parentNode.getBoundingClientRect();

            if (childNodeRect.bottom > parentNodeRect.bottom || childNodeRect.top < parentNodeRect.top) {
                elemObj.scrollIntoView(centerIfNeeded);
            }
        } else {
            elemObj.scrollIntoViewIfNeeded(centerIfNeeded);
        }
    }
}

export { scrollIntoViewIfNeededUtil, scrollIntoViewIfNeededUtilByBounding }