  function fakeStat(object) {
    var formatted_txt
    switch (object.type) {
      case 'class':
        ret = formatted_txt //FormattedTxt
        break
      case 'filename':
        ret = formatted_txt //formatted-txt
        break
	case 'modelname':
        ret = formatted_txt //formatted-txt
        break
    }
    return ret
  }