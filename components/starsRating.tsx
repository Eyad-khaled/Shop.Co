import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";

interface Props {
    rating: number; // example: 4.5
}

const StarRating = ({ rating }: Props) => {
    return (
        <div style={{ display: "flex", gap: 2 }}>
            {[1, 2, 3, 4, 5].map((i) => {
                if (rating >= i) {
                    return <StarIcon key={i} sx={{ color: "#facc15" }} />;
                }

                if (rating >= i - 0.5) {
                    return <StarHalfIcon key={i} sx={{ color: "#facc15" }} />;
                }

                return <StarBorderIcon key={i} sx={{ color: "#facc15" }} />;
            })}
        </div>
    );
};

export default StarRating;