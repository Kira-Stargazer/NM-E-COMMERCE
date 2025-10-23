import { Heart, Star } from 'lucide-react';
import { Product } from '@/data/products';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const { wishlist, toggleWishlist } = useApp();
  const isWishlisted = wishlist.some(item => item.id === product.id);

  return (
    <Card 
      className="group overflow-hidden cursor-pointer transition-all duration-500 border-border/50 rounded-2xl hover:shadow-[0_12px_32px_rgba(255,111,97,0.25)] hover:border-primary/20 hover:-translate-y-1"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-secondary/30 to-secondary/10">
        {/* Image with overlay effects */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-105"
        />
        {/* Subtle border glow effect */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/10 transition-colors duration-500 rounded-t-2xl" />
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-full p-2 hover:bg-background transition-colors"
        >
          <Heart
            className={`h-5 w-5 ${
              isWishlisted ? 'fill-primary text-primary' : 'text-foreground'
            }`}
          />
        </button>
        {product.tags && product.tags.length > 0 && (
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="bg-primary text-primary-foreground text-xs capitalize">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-sm mb-1 line-clamp-2">{product.name}</h3>
        <div className="flex items-center gap-1 mb-2">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{product.rating}</span>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-primary">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};
