import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Lock, CheckCircle2, Shield, AlertTriangle } from "lucide-react";

export default function BankSync() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [showAgreement, setShowAgreement] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const [signature, setSignature] = useState("");
  const [bank, setBank] = useState("");
  const [accountType, setAccountType] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  
  const { toast } = useToast();

  // Handle form submission
  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConnecting(true);
    
    // Here would be API call to verify bank info
    setTimeout(() => {
      setIsConnecting(false);
      setShowAgreement(true);
    }, 1500);
  };

  // Handle agreement submission
  const handleSignAgreement = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!signature) {
      toast({
        variant: "destructive",
        title: "Signature required",
        description: "Please provide your signature to continue",
      });
      return;
    }
    
    setIsSigning(true);
    
    // Here would be API call to register agreement
    setTimeout(() => {
      setIsSigning(false);
      setShowAgreement(false);
      setShowSuccessDialog(true);
      
      // XP reward!
      toast({
        title: "Bank account connected!",
        description: "+50 XP for building trust and financial transparency!",
      });
    }, 1500);
  };

  // Animation variants for signature
  const signatureVariants = {
    writing: {
      width: ["0%", "100%"],
      transition: { duration: 1.5, ease: "easeInOut" }
    }
  };
  
  // Connected banks (mock data)
  const connectedBanks = [
    {
      id: 1,
      name: "Chase Bank",
      type: "Checking",
      maskedNumber: "****4582",
      balance: 3240.56,
      lastUpdated: "Today at 8:35 AM"
    }
  ];

  return (
    <Card>
      <CardHeader className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          Bank Sync & Agreements
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Connect your bank accounts and manage financial agreements.
        </p>
      </CardHeader>
      
      <CardContent className="p-6">
        {/* Connected banks section */}
        {connectedBanks.length > 0 && (
          <div className="mb-8">
            <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
              Connected Accounts
            </h4>
            
            <div className="space-y-4">
              {connectedBanks.map((connectedBank) => (
                <div key={connectedBank.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mr-3">
                      <CheckCircle2 className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 dark:text-white">
                        {connectedBank.name} ({connectedBank.type})
                      </h5>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {connectedBank.maskedNumber} • Updated {connectedBank.lastUpdated}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-900 dark:text-white">
                      ${connectedBank.balance.toLocaleString()}
                    </div>
                    <div className="text-xs text-green-600 dark:text-green-400">
                      Connected
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      
        {/* Connect new bank form */}
        <div className="bg-gray-50 dark:bg-gray-900 p-5 rounded-lg border border-gray-200 dark:border-gray-700">
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Connect New Bank Account
          </h4>
          
          <div className="flex items-center py-3 px-4 mb-4 text-sm text-blue-800 bg-blue-100 dark:bg-blue-900 dark:text-blue-300 rounded-lg">
            <Shield className="flex-shrink-0 mr-2 h-4 w-4" />
            <span>
              <strong>Secure Connection:</strong> Your banking information is encrypted and never stored directly in our database.
            </span>
          </div>
          
          <form onSubmit={handleConnect} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="bank-name">Bank Name</Label>
                <Select
                  value={bank}
                  onValueChange={setBank}
                >
                  <SelectTrigger id="bank-name">
                    <SelectValue placeholder="Select your bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="chase">Chase Bank</SelectItem>
                    <SelectItem value="wells-fargo">Wells Fargo</SelectItem>
                    <SelectItem value="bank-of-america">Bank of America</SelectItem>
                    <SelectItem value="citibank">Citibank</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="account-type">Account Type</Label>
                <Select
                  value={accountType}
                  onValueChange={setAccountType}
                >
                  <SelectTrigger id="account-type">
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checking">Checking</SelectItem>
                    <SelectItem value="savings">Savings</SelectItem>
                    <SelectItem value="credit">Credit Card</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="account-number">Account Number</Label>
                <Input
                  id="account-number"
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="Account number"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="routing-number">Routing Number</Label>
                <Input
                  id="routing-number"
                  type="text" 
                  value={routingNumber}
                  onChange={(e) => setRoutingNumber(e.target.value)}
                  placeholder="Routing number"
                />
              </div>
            </div>
            
            <div className="flex items-start pt-4">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                className="mt-1"
              />
              <Label htmlFor="terms" className="ml-2 text-sm">
                I understand that connecting my bank requires authorization and I will sign a secure agreement.
              </Label>
            </div>
            
            <div className="pt-2">
              <Button 
                type="submit" 
                className="bg-primary-600 hover:bg-primary-700 w-full sm:w-auto" 
                disabled={!bank || !accountType || !accountNumber || !routingNumber || !agreedToTerms || isConnecting}
              >
                {isConnecting ? (
                  <span className="flex items-center">
                    <span className="animate-spin mr-2">
                      <svg className="h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    </span>
                    Verifying...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Lock className="mr-2 h-4 w-4" />
                    Securely Connect
                  </span>
                )}
              </Button>
            </div>
          </form>
        </div>
      </CardContent>
      
      {/* Agreement Dialog */}
      <Dialog open={showAgreement} onOpenChange={setShowAgreement}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Bank Connection Agreement</DialogTitle>
            <DialogDescription>
              Review and sign the following agreement to connect your account.
            </DialogDescription>
          </DialogHeader>
          
          <div className="max-h-[400px] overflow-auto my-4 p-4 text-sm border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900">
            <h4 className="font-bold mb-2">Bank Connection Terms</h4>
            <p className="mb-2">
              By signing this agreement, you authorize Fincread to access your financial institution account information, including account balances, transactions, and other financial data for the purposes of:
            </p>
            <ul className="list-disc pl-5 mb-2 space-y-1">
              <li>Displaying your financial information within the Fincread application</li>
              <li>Analyzing spending patterns and providing personalized financial insights</li>
              <li>Calculating your FinCred Score and financial health indicators</li>
              <li>Providing relevant financial education and challenges</li>
            </ul>
            
            <h4 className="font-bold mb-2 mt-4">Data Security</h4>
            <p className="mb-2">
              Fincread employs industry-standard security measures to protect your data. We:
            </p>
            <ul className="list-disc pl-5 mb-2 space-y-1">
              <li>Encrypt all sensitive financial information</li>
              <li>Never store your account credentials</li>
              <li>Use secure, tokenized connections to access your accounts</li>
              <li>Will never sell or share your financial data with third parties</li>
            </ul>
            
            <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-md">
              <div className="flex items-start">
                <AlertTriangle className="flex-shrink-0 h-5 w-5 text-amber-600 dark:text-amber-500 mt-0.5 mr-2" />
                <div>
                  <h5 className="font-medium text-amber-800 dark:text-amber-400">Important Notice</h5>
                  <p className="text-amber-700 dark:text-amber-300 text-sm">
                    You may revoke this authorization at any time by disconnecting your bank account in the settings menu. Revoking will not affect any previous data already accessed.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="signature">Signature (Type your full name)</Label>
            <Input
              id="signature"
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              placeholder="Your full legal name"
              className="border-b-2 border-primary-500"
            />
          </div>
          
          {signature && (
            <div className="mx-auto max-w-md mt-2">
              <div className="relative h-16 flex items-center justify-center">
                <motion.div
                  className="absolute border-b-2 border-primary-600 dark:border-primary-400"
                  style={{ width: "100%" }}
                  initial={{ width: 0 }}
                  animate="writing"
                  variants={signatureVariants}
                />
                <motion.div
                  className="text-primary-700 dark:text-primary-300 italic text-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                >
                  {signature}
                </motion.div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShowAgreement(false)} disabled={isSigning}>
              Cancel
            </Button>
            <Button 
              type="button" 
              className="bg-primary-600 hover:bg-primary-700" 
              disabled={!signature || isSigning}
              onClick={handleSignAgreement}
            >
              {isSigning ? (
                <span className="flex items-center">
                  <span className="animate-spin mr-2">
                    <svg className="h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  </span>
                  Processing...
                </span>
              ) : (
                "Sign & Connect"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <motion.div 
              className="mx-auto mt-4 mb-2 bg-green-100 dark:bg-green-900 rounded-full p-3 w-16 h-16 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
            </motion.div>
            <DialogTitle className="text-center text-xl">Bank Connected Successfully!</DialogTitle>
          </DialogHeader>
          
          <div className="text-center space-y-3 py-4">
            <p className="text-gray-600 dark:text-gray-400">
              Your bank account has been securely connected to Fincread.
            </p>
            
            <motion.div
              className="bg-primary-50 dark:bg-primary-900/30 py-3 px-4 rounded-lg mx-auto max-w-xs flex items-center justify-center space-x-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="font-medium text-primary-700 dark:text-primary-300">+50 XP</div>
              <div className="w-1 h-8 bg-primary-200 dark:bg-primary-700 rounded-full"></div>
              <div className="text-sm text-primary-600 dark:text-primary-400">Financial Trust</div>
            </motion.div>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              className="w-full bg-primary-600 hover:bg-primary-700" 
              onClick={() => setShowSuccessDialog(false)}
            >
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}