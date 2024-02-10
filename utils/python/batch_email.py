import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import base64

def read_email_addresses(file_path):
    with open(file_path, 'r') as file:
        email_addresses = [line.strip() for line in file.readlines() if line.strip()]
    return email_addresses

def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode("utf-8")
    return encoded_string

def send_email(sender_email, sender_password, receiver_email, subject, message, image_path):
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = receiver_email
    msg['Subject'] = subject

    # Create HTML content with embedded image
    html_content = f"""\
    <html>
      <body>
        <p>{message}</p>
        <img src="data:image/png;base64,{encode_image(image_path)}" alt="Company Logo" style="display:inline; margin:auto; width:100px; height:100px;">
      </body>
    </html>
    """
    msg.attach(MIMEText(html_content, 'html'))

    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(sender_email, sender_password)
    text = msg.as_string()
    server.sendmail(sender_email, receiver_email, text)
    server.quit()

def main():
    sender_email = 'mahirahmed691@gmail.com'
    sender_password = "edcekugujjioiqbw"
    template_path = "email_template.txt"
    subject = "Hello"
    image_path = '../assets/Logo.png'

    with open(template_path, 'r') as template_file:
        message_template = template_file.read()

    email_addresses = read_email_addresses('email_list.txt')  # Update with your email list file path

    for receiver_email in email_addresses:
        message = message_template.format(receiver_email=receiver_email)
        send_email(sender_email, sender_password, receiver_email, subject, message, image_path)
        print(f"Email sent to {receiver_email}")

if __name__ == "__main__":
    main()
