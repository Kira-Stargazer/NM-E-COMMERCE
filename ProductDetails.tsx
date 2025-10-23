import { useParams, useNavigate } from 'react-router-dom';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart, ShoppingCart, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, wishlist, toggleWishlist } = useApp();

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Product not found</p>
      </div>
    );
  }

  const isWishlisted = wishlist.some(item => item.id === product.id);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success('Added to cart!');
  };

  const reviews = [
    { id: 1, user: 'Sarah M.', rating: 5, comment: 'Excellent product! Exceeded my expectations.', date: '2 days ago' },
    { id: 2, user: 'John D.', rating: 4, comment: 'Good quality, fast delivery.', date: '1 week ago' },
    { id: 3, user: 'Emily R.', rating: 5, comment: 'Love it! Would definitely recommend.', date: '2 weeks ago' },
  ];

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-40 p-4">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-secondary rounded-full">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="font-semibold">Product Details</h1>
          <button
            onClick={() => toggleWishlist(product)}
            className="p-2 hover:bg-secondary rounded-full"
          >
            <Heart
              className={`h-6 w-6 ${
                isWishlisted ? 'fill-primary text-primary' : 'text-foreground'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Product Image */}
      <div className="relative aspect-square mx-4 mt-4 rounded-3xl overflow-hidden bg-gradient-to-br from-secondary/30 via-secondary/20 to-secondary/10 shadow-[0_8px_24px_rgba(255,111,97,0.15)] border-4 border-background">
        {/* Decorative gradient border */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-3xl" />
        
        {/* Main image with subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/3 to-transparent z-10" />
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover relative z-0"
        />
        
        {/* Elegant frame effect */}
        <div className="absolute inset-0 border border-white/20 rounded-3xl z-20" />
        {product.tags && product.tags.length > 0 && (
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.tags.map(tag => (
              <Badge key={tag} className="bg-primary text-primary-foreground capitalize">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-4">
        {/* Title and Price */}
        <div>
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-border'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-primary">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xl text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
            )}
            {product.originalPrice && (
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </Badge>
            )}
          </div>
        </div>

        <Separator />

        {/* Description */}
        <div>
          <h3 className="font-semibold mb-2">Description</h3>
          <p className="text-muted-foreground leading-relaxed">{product.description}</p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 text-center border-border">
            <Truck className="h-6 w-6 mx-auto mb-2 text-primary" />
            <p className="text-xs font-medium">Free Delivery</p>
          </Card>
          <Card className="p-4 text-center border-border">
            <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
            <p className="text-xs font-medium">Secure Payment</p>
          </Card>
          <Card className="p-4 text-center border-border">
            <RotateCcw className="h-6 w-6 mx-auto mb-2 text-primary" />
            <p className="text-xs font-medium">Easy Returns</p>
          </Card>
        </div>

        <Separator />

        {/* Reviews */}
        <div>
          <h3 className="font-semibold mb-3">Customer Reviews</h3>
          <div className="space-y-3">
            {reviews.map(review => (
              <Card key={review.id} className="p-4 border-border">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium">{review.user}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-border'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
                <p className="text-sm text-muted-foreground">{review.comment}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 flex gap-3">
        <Button
          variant="outline"
          size="lg"
          className="flex-1 h-14 rounded-xl"
          onClick={() => {
            toggleWishlist(product);
            toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
          }}
        >
          <Heart className={`h-5 w-5 mr-2 ${isWishlisted ? 'fill-primary' : ''}`} />
          Wishlist
        </Button>
        <Button
          size="lg"
          className="flex-1 h-14 rounded-xl"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductDetails;
