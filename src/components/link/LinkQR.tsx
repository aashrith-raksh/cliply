
type LinkQRProps = {
    qrPublicUrl: string;
    linkTitle:string
}
const LinkQR = ({qrPublicUrl, linkTitle}:LinkQRProps) => {
  return (
    <img
          src={qrPublicUrl}
          alt={`QR for ${linkTitle}`}
          className="w-full object-contain mx-auto"
          width={96}
          height={96}
        />
  )
}

export default LinkQR
