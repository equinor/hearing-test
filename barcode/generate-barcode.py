# To install python-barcode(https://github.com/WhyNotHugo/python-barcode), run:
# pip install python-barcode

# To install Pillow, run:
# pip install pillow

from barcode import EAN8
from barcode.writer import ImageWriter

number = '01122022'
my_code = EAN8(number, writer=ImageWriter())
my_code.save("barcode")