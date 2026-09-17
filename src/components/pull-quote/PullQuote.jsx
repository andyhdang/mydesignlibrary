import "./PullQuote.css";

export default function PullQuote({
  quote,
  imageSrc,
  imageAlt = "",
  attribution,
}) {
  return (
    <figure className="pull-quote">
      <blockquote className="pull-quote__quote">
        <p>{quote}</p>
      </blockquote>
      {attribution && (
        <figcaption className="pull-quote__attribution">
          {imageSrc && (
            <img
              className="pull-quote__image"
              src={imageSrc}
              alt={imageAlt}
            />
          )}
          <cite className="pull-quote__person">{attribution}</cite>
        </figcaption>
      )}
    </figure>
  );
}
