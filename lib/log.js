// logging utilities
const
  style = {
    log: '',
    error: 'background-color: #ff0; color: #f00;'
  };


// styled logging
export function log(type, msg) {

  type = type || 'log';

  if (!msg.startsWith(' ')) {
    msg = ' ' + msg.trim() + ' ';
  }

  console?.[type]( '%c' + msg, style?.[type] );

}
